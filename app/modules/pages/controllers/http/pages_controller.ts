import { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"
import { ShopService } from "#modules/shop/services/shop_service"

@inject()
export class PagesController {
    constructor(private shopService: ShopService) {}

    async home({ view, params }: HttpContext) {
        const handle = params.handle || "all"
        const data = await this.shopService.getProducts(handle)
        return view.render('pages/index', { collection: data })
    }
}