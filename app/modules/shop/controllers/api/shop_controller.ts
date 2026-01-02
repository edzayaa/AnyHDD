import { HttpContext } from "@adonisjs/core/http"
import StorefrontClient from "#shopify/storefront"
import { ShopService } from "#modules/shop/services/shop_service"
import { ProductCollectionSortKey } from "#modules/shop/interfaces/shop_interface"

export class ShopApiController {
    private shopService: ShopService

    constructor() {
        const storefront = new StorefrontClient()
        this.shopService = new ShopService(storefront)
    }

    async bestSellingProducts({ view }: HttpContext) {
        const data = await this.shopService.getBestSellingProducts()
        return view.render('components/shop/_best-sellers', { products: data.products })
    }

    async getCollection({ view, params }: HttpContext) {
        const data = await this.shopService.getProducts(params.handle)
        return view.render('components/shop/_products', { collection: data })
    }

    async getFilteredProducts({ request, view, params }: HttpContext) {
        const qs = request.qs()
        const handle = params.handle || 'all'

        const metafields: Array<{ namespace: string; key: string; value: string }> = []
        
        if (qs.metafield && typeof qs.metafield === 'object') {
            for (const [nsKey, value] of Object.entries(qs.metafield)) {
                const [namespace, key] = nsKey.split('.')
                if (namespace && key && value) {
                    metafields.push({ namespace, key, value: String(value) })
                }
            }
        }

        let minPrice: number | undefined
        let maxPrice: number | undefined
        if (qs.priceRange && typeof qs.priceRange === 'string' && qs.priceRange.includes('-')) {
            const [min, max] = qs.priceRange.split('-')
            minPrice = min ? parseFloat(min) : undefined
            maxPrice = max ? parseFloat(max) : undefined
        } else {
            minPrice = qs.minPrice ? parseFloat(qs.minPrice) : undefined
            maxPrice = qs.maxPrice ? parseFloat(qs.maxPrice) : undefined
        }

        let sortKey: ProductCollectionSortKey = 'COLLECTION_DEFAULT'
        let reverse = qs.reverse === 'true'
        
        if (qs.sortKey) {
            if (qs.sortKey === 'PRICE_DESC') {
                sortKey = 'PRICE'
                reverse = true
            } else {
                sortKey = qs.sortKey as ProductCollectionSortKey
            }
        }

        const params_filter: any = {
            handle,
            sortKey,
            reverse,
            minPrice,
            maxPrice,
            productType: qs.productType || undefined,
            metafields: metafields.length > 0 ? metafields : undefined,
        }

        if (qs.before) {
            params_filter.last = qs.limit ? parseInt(qs.limit) : 18
            params_filter.before = qs.before
        } else {
            params_filter.first = qs.limit ? parseInt(qs.limit) : 18
            if (qs.after) {
                params_filter.after = qs.after
            }
        }

        const data = await this.shopService.getFilteredCollection(params_filter)

        return view.render('components/shop/_products-container', {
            collection: data.collection,
        })
    }
}