import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import { loginValidator, registerValidator, forgotPasswordValidator, activateAccountValidator, resetPasswordValidator } from "#modules/auth/validators/auth"
import AuthService from "#modules/auth/services/auth_service"

import router from "@adonisjs/core/services/router"

@inject()
export class AuthController {
    constructor(private authService: AuthService) {}
    
    async login({ request, response }: HttpContext) {
        const payload = await request.validateUsing(loginValidator)
        const data = await this.authService.login(payload)
        response.cookie('customerAccessToken', data.accessToken)
        response.header('HX-Redirect', router.makeUrl('customer.overview'))
        return response.noContent()
    }

    async register({ request, response, session }: HttpContext) {
        const payload = await request.validateUsing(registerValidator, {
            data: request.body()
        })
        await this.authService.register(payload, request.ip())
        
        session.flash('notification', {
            type: 'success',
            message: 'Registration successful! Please login to your account.',
            title: 'Registration Successful',
            scope: request.header('X-Feedback-Scope') || 'global'
        })
        
        return response
            .header('HX-Redirect', router.makeUrl('auth.login'))
            .noContent()
    }

    async forgotPassword({ request, response }: HttpContext) {
        const payload = await request.validateUsing(forgotPasswordValidator, {
            data: request.body()
        })
        await this.authService.forgotPassword(payload, request.ip())
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    message: 'If an account with that email exists, a password reset link has been sent.',
                    title: 'Password Reset',
                    scope: request.header('X-Error-Scope') || 'global'
                }
            }))
            .noContent()
    }

    async resetPassword({ request, response, session }: HttpContext) {
        const payload = await request.validateUsing(resetPasswordValidator, {
            data: request.body()
        })
        await this.authService.resetPassword(payload, request.ip())
        session.flash('success', 'Your password has been reset successfully! Please login to your account.')
        response.header('HX-Redirect', router.makeUrl('auth.login'))
        return response.noContent()
    }

    async activateAccount({ request, response }: HttpContext) {
        const payload = await request.validateUsing(activateAccountValidator, {
            data: request.body()
        })
        const data = await this.authService.activateAccount(payload, request.ip())
        return response.ok(data)
    }

    async deleteAccessToken({ request, response }: HttpContext) {
        const accessToken = request.cookie('customerAccessToken')
        await this.authService.deleteAccessToken(accessToken, request.ip())
        response.clearCookie('customerAccessToken')
        response.header('HX-Redirect', router.makeUrl('home'))
        return response.noContent()
    }
}