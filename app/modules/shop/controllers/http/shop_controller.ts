import { HttpContext } from "@adonisjs/core/http"
import StorefrontClient from "#shopify/storefront"
import { ShopService } from "#modules/shop/services/shop_service"

export class ShopController {
    private shopService: ShopService

    constructor() {
        const storefront = new StorefrontClient()
        this.shopService = new ShopService(storefront)
    }

    async products({ view, params }: HttpContext) {
        const handle = params.handle || "frontpage"
        const data = await this.shopService.getProducts(handle)
        if (!data) {
            return view.render('pages/errors/not_found')
        }
        return view.render('pages/shop/products', { collection: data })
    }

    async getProduct({ params, view }: HttpContext) {
        const data = await this.shopService.getProductByHandle(params.handle)
        if (!data) {
            return view.render('pages/errors/not_found')
        }
        return view.render('pages/shop/product', { product: data } )
    }
}