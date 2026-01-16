import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import router from "@adonisjs/core/services/router";

// Services
import { CustomerService } from "#modules/customer/services/customer_service";

// Validators
import {
    addressValidator,
    customerValidator,
    defaultAddressValidator,
    updateAddressValidator,
    subscribeValidator
} from "#modules/customer/validators/customer_validator";

import { BadRequestException } from "#exceptions/common";

@inject()
export class CustomerApiController {
    constructor(private customerService: CustomerService) {}

    async getCustomerAddresses({ request, response }: HttpContext) {
        const data = await this.customerService.getCustomerAddresses(request.cookie('accessToken'))
        if (!data) return response.notFound()
        return response.ok(data)
    }

    async updateCustomer({ request, response, session, view }: HttpContext) {
        const payload = await request.validateUsing(customerValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })

        const hasUpdateField = payload.firstName || payload.lastName || payload.email ||
            payload.phone || payload.password;

        if (!hasUpdateField) {
            throw new BadRequestException('At least one field must be provided for update')
        }

        const { data, updatePassword } = await this.customerService.updateCustomer(payload)
        if (updatePassword) {
            session.flash('success', 'Your password has been updated successfully! Please login to your account.')
            response.clearCookie('customerAccessToken')
            response.header('HX-Redirect', router.makeUrl('auth.login'))
        }
        response.status(200).header('HX-Trigger', 'close:modal')
        return view.render('components/accounts/_personal_info', { customer: data })
    }

    async createAddress({ request, response, view }: HttpContext) {
        const payload = await request.validateUsing(addressValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })

        const addressData = await this.customerService.createAddress(payload)
        const address = {
            node: addressData
        }

        response.status(201)
        return view.render('components/accounts/_address_item', { address })
    }

    async updateAddress({ request, response, view }: HttpContext) {
        const payload = await request.validateUsing(updateAddressValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })

        const addressData = await this.customerService.updateAddress(payload)
        const address = {
            node: addressData
        }

        response.status(200)
        return view.render('components/accounts/_address_item', { address })
    }

    async updateDefaultAddress({ request, response }: HttpContext) {
        const payload = await request.validateUsing(defaultAddressValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })
        await this.customerService.updateDefaultAddress(payload)
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    type: 'success',
                    message: 'Default address has been updated successfully!',
                    title: 'Default Address Updated',
                    scope: request.header('X-Feedback-Scope') || 'global'
                }
            }))
            .noContent()
    }

    async deleteAddress({ request, response }: HttpContext) {
        const payload = await request.validateUsing(defaultAddressValidator, {
            data: { customerAccessToken: request.cookie('customerAccessToken'), ...request.body() }
        })

        await this.customerService.deleteAddress(payload)
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    type: 'success',
                    message: 'Address has been deleted successfully!',
                    title: 'Address Deleted',
                    scope: request.header('X-Error-Scope') || 'global'
                }
            }))
            .noContent()
    }

    async subscribeToMarketing({ request, response }: HttpContext) {
        const payload = await request.validateUsing(subscribeValidator, {
            data: request.body()
        })
        const { status } = await this.customerService.subscribeToMarketing(payload)
        if (status === 'ALREADY_SUBSCRIBED') {
            return response
                .status(400)
                .header('HX-Trigger', JSON.stringify({
                    'app:error': {
                        type: 'error',
                        message: 'This email is already subscribed to our marketing list.',
                        title: 'Already Subscribed',
                        scope: request.header('X-Error-Scope') || 'global'
                    }
                }))
                .noContent()
        }
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    type: 'success',
                    message: 'You have been subscribed to our marketing list successfully!',
                    title: 'Subscribed',
                    scope: request.header('X-Feedback-Scope') || 'global'
                }
            }))
            .noContent()
    }
}