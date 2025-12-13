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
        response.header('HX-Redirect', router.makeUrl('account.overview'))
        return response.noContent()
    }

    async register({ request, response, session }: HttpContext) {
        const payload = await request.validateUsing(registerValidator, {
            data: request.body()
        })
        await this.authService.register(payload, request.ip())
        session.flash('success', 'Registration successful! Please login to your account.')
        response.header('HX-Redirect', router.makeUrl('auth.login'))
        return response.noContent()
    }

    async forgotPassword({ request, view }: HttpContext) {
        const payload = await request.validateUsing(forgotPasswordValidator, {
            data: request.body()
        })
        await this.authService.forgotPassword(payload, request.ip())
        return view.render('components/feedback/_response_success', { 
            message: 'If an account with that email exists, a password reset link has been sent.' 
        })
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
        const accessToken = request.cookie('accessToken')
        const data = await this.authService.deleteAccessToken(accessToken, request.ip())
        response.clearCookie('accessToken')
        return response.ok(data)
    }
}