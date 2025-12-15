import { HttpContext } from "@adonisjs/core/http"

export class PagesController {
    home({ view, request }: HttpContext) {
        return view.render('pages/index')
    }
}