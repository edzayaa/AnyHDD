import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import router from "@adonisjs/core/services/router";

// Services
import StorefrontClient from "#shopify/storefront";
import { CustomerService } from "#modules/customer/services/customer_service";

// Validators
import { 
    addressValidator, 
    customerValidator, 
} from "#modules/customer/validators/customer_validator";

import { BadRequestException } from "#exceptions/common";

@inject()
export class CustomerApiController {
    private customerService: CustomerService
    constructor() {
        const storefrontClient = new StorefrontClient()
        this.customerService = new CustomerService(storefrontClient)
    }

    async getCustomerAddresses({ request, response }: HttpContext) {
        const data = await this.customerService.getCustomerAddresses(request.cookie('accessToken'))
        if (!data) return response.notFound()
        return response.ok(data)
    }

    async updateCustomer({ request, response, session, view }: HttpContext) {
        console.log('Update Customer Request Body:', request.body());
        const payload = await request.validateUsing(customerValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })

        const hasUpdateField = payload.firstName || payload.lastName || payload.email || 
                               payload.phone || payload.password;
        
        if (!hasUpdateField) {
            throw new BadRequestException('At least one field must be provided for update')
        }

        const { data, updatePassword }= await this.customerService.updateCustomer(payload)
        if (updatePassword) {
            session.flash('success', 'Your password has been updated successfully! Please login to your account.')
            response.header('HX-Redirect', router.makeUrl('auth.login'))
        }
        response.header('HX-Trigger', 'close:modal')
        return view.render('components/accounts/_personal_info', { customer: data })
    }

    async createAddress({ request, response }: HttpContext) {
        const payload = await request.validateUsing(addressValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })
        return response.created(await this.customerService.createAddress(payload))
    }

    /**
    async updateDefaultAddress({ request, params, response }: HttpContext) {
        const data = await request.body()
        const variables = this.sanitize(request.cookie('accessToken'), data)
        return response.ok(await this.customerService.updateDefaultAddress({ ...variables, addressId: params.id }))
    }
    */
}