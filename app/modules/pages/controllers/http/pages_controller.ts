import { HttpContext } from "@adonisjs/core/http"
import StorefrontClient from "#shopify/storefront"
import { ShopService } from "#modules/shop/services/shop_service"

export class PagesController {
    private shopService: ShopService

    constructor() {
        const storefront = new StorefrontClient()
        this.shopService = new ShopService(storefront)
    }

    async home({ view, params }: HttpContext) {
        const handle = params.handle || "frontpage"
        const data = await this.shopService.getProducts(handle)
        return view.render('pages/index', { collection: data })
    }
}