import { HttpContext } from "@adonisjs/core/http"

export class AccountsController {
    overview({ view }: HttpContext) {
        return view.render('pages/accounts/overview')
    }

    settings({ view }: HttpContext) {
        return view.render('pages/accounts/my-account')
    }

    addresses({ view }: HttpContext) {
        return view.render('pages/accounts/addresses')
    }

    orders({ view }: HttpContext) {
        return view.render('pages/accounts/orders')
    }
}