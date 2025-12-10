import { HttpContext } from "@adonisjs/core/http"

export class ShopController {
    products({ view }: HttpContext) {
        return view.render('pages/shop/products')
    }

    findProduct({ params, view }: HttpContext) {
        const productId = params.id
        return view.render('pages/shop/product', { productId })
    }
}