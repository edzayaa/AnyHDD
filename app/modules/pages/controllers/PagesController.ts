import { HttpContext } from "@adonisjs/core/http";

export class PagesController {
    index({ view }: HttpContext) {
        return view.render('pages/index');
    }

    faq({ view }: HttpContext) {
        return view.render('pages/faq');
    }

    sellUs({ view }: HttpContext) {
        return view.render('pages/sell-us');
    }

    contact({ view }: HttpContext) {
        return view.render('pages/contact');
    }

    warranty({ view }: HttpContext) {
        return view.render('pages/warranty');
    }

    about({ view }: HttpContext) {
        return view.render('pages/about');
    }

    terms({ view }: HttpContext) {
        return view.render('pages/terms');
    }

    privacy({ view }: HttpContext) {
        return view.render('pages/privacy');
    }
}