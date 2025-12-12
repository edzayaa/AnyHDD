import { inject } from "@adonisjs/core";
import StorefrontClient from "#shopify/storefront";

import * as mutations from "#modules/auth/graphql/mutations"

import { InputInterface }from "#interfaces/shopify_interface"
import * as Response from "#modules/auth/interfaces/auth_interface"

import handleUserErrors from "#helpers/user_errors"
import { BadRequestException } from "#exceptions/common"

import AuthMapper from "#modules/auth/mappers/auth_mapper"

@inject()
export default class AuthService {
    constructor(private storefront: StorefrontClient) {}

    async login(body: InputInterface) {
        const variables = AuthMapper.toAuth(body)
        const data = await this.storefront.request(mutations.customerAccessTokenCreate, variables) as Response.LoginInterface
        const customerData = data.customerAccessTokenCreate
        handleUserErrors(customerData.customerUserErrors)

        return {
            accessToken: customerData.customerAccessToken.accessToken,
        }
    }

    async register(body: InputInterface) {
        const variables = AuthMapper.toAuth(body)
        const data = await this.storefront.request(mutations.customerCreate, variables) as Response.RegisterInterface
        const customerData = data.customerCreate
        handleUserErrors(customerData.customerUserErrors)
        return customerData.customer
    }

    async forgotPassword(body: InputInterface) {
        const variables = AuthMapper.toForgotPassword(body)
        const data = await this.storefront.request(mutations.customerRecover, variables) as Response.ForgotPasswordInterface
        const customerData = data.customerRecover
        handleUserErrors(customerData.customerUserErrors)
        return { success: true}
    }

    async resetPassword(body: InputInterface) {
        const variables = AuthMapper.toResetPassword(body)
        const data = await this.storefront.request(mutations.customerReset, variables) as Response.ResetPasswordInterface
        const customerData = data.customerReset
        handleUserErrors(customerData.customerUserErrors)
        return { success: true}
    }

    async activateAccount(body: InputInterface) {
        const variables = AuthMapper.toActivateAccount(body)
        const data = await this.storefront.request(mutations.customerActivate, variables) as Response.ActivateAccountInterface
        const customerData = data.customerActivate
        handleUserErrors(customerData.customerUserErrors)
        return { success: true}
    }

    async deleteAccessToken(customerAccessToken: string) {
        if (!customerAccessToken) throw new BadRequestException('Access token is required')
        await this.storefront.request(mutations.customerAccessTokenDelete, { customerAccessToken })
        return { success: true}
    }
}