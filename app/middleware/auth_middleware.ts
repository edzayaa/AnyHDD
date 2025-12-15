import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import router from '@adonisjs/core/services/router'

export default class CustomerAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { response, request } = ctx
    const accessToken = request.cookie('customerAccessToken')
    
    if (!accessToken) {
      const loginUrl = router.makeUrl('auth.login')
      response.redirect(loginUrl)
      return
    }

    await next()
  }
}