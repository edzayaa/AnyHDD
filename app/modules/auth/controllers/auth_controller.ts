import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import { loginValidator, registerValidator, forgotPasswordValidator, activateAccountValidator, resetPasswordValidator } from "#modules/auth/validators/auth"
import AuthService from "#modules/auth/services/auth_service"

@inject()
export class AuthController {
    constructor(private authService: AuthService) {}
    
    async login({ request, response }: HttpContext) {
        const payload = await request.validateUsing(loginValidator, {
            data: request.body()
        })
        const data = await this.authService.login(payload)
        response.cookie('accessToken', data.accessToken)
        return response.ok(data)
    }

    async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(registerValidator, {
            data: request.body()
        })
        const data = await this.authService.register(payload)
        return response.created(data)
    }

    async forgotPassword({ request, response }: HttpContext) {
        const payload = await request.validateUsing(forgotPasswordValidator, {
            data: request.body()
        })
        const data = await this.authService.forgotPassword(payload)
        return response.ok(data)
    }

    async resetPassword({ request, response }: HttpContext) {
        const payload = await request.validateUsing(resetPasswordValidator, {
            data: request.body()
        })
        const data = await this.authService.resetPassword(payload)
        return response.ok(data)
    }

    async activateAccount({ request, response }: HttpContext) {
        const payload = await request.validateUsing(activateAccountValidator, {
            data: request.body()
        })
        const data = await this.authService.activateAccount(payload)
        return response.ok(data)
    }

    async deleteAccessToken({ request, response }: HttpContext) {
        const accessToken = request.cookie('accessToken')
        const data = await this.authService.deleteAccessToken(accessToken)
        response.clearCookie('accessToken')
        return response.ok(data)
    }
}