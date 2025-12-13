import { HttpContext } from "@adonisjs/core/http"
import StorefrontClient from "#shopify/storefront";
import { CustomerService } from "#modules/customer/services/customer_service"

import router from "@adonisjs/core/services/router";

export class CustomerController {
    private customerService: CustomerService

    constructor() {
        const storefrontClient = new StorefrontClient()
        this.customerService = new CustomerService(storefrontClient)
    }

    private unauthorized(response: HttpContext['response']) {
        response.clearCookie('customerAccessToken')
        return response.redirect(router.makeUrl('auth.login'))
    }

    private async getCustomer(ctx: HttpContext, action: string = 'overview') {
        let customer;
        const cookie = ctx.request.cookie('customerAccessToken')
        if (action === 'addresses') {
            customer = await this.customerService.getCustomerAddresses(cookie)
        } else {
            customer = await this.customerService.getCustomer(cookie)
        }
        if (!customer) {
            return this.unauthorized(ctx.response)
        }
        return customer
    }

    async overview(ctx: HttpContext) {
        const customer = await this.getCustomer(ctx)
        return ctx.view.render('pages/accounts/overview', { customer })
    }

    async settings(ctx: HttpContext) {
        const customer = await this.getCustomer(ctx)
        return ctx.view.render('pages/accounts/my-account', { customer })
    }

    async addresses(ctx: HttpContext) {
        const customer = await this.getCustomer(ctx, 'addresses')
        return ctx.view.render('pages/accounts/addresses', { customer })
    }

    orders({ view }: HttpContext) {
        return view.render('pages/accounts/orders')
    }
}