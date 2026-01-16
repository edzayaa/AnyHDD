import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { ShopService } from '#modules/shop/services/shop_service'

let collectionsCache: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30 * 60 * 1000 

export default class CollectionsMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        if (!ctx.request.url().startsWith('/api')) {
            const now = Date.now()

            const isCacheValid = collectionsCache && (now - cacheTimestamp < CACHE_DURATION)

            if (!isCacheValid) {
                try {
                    const shopService = await ctx.containerResolver.make(ShopService)
                    const collections = await shopService.getCollections()

                    collectionsCache = collections
                    cacheTimestamp = now

                    ctx.view.share({ collections })
                } catch (error) {
                    ctx.view.share({ collections: collectionsCache || { edges: [] } })
                    console.error('Error fetching collections:', error)
                }
            } else {
                ctx.view.share({ collections: collectionsCache })
            }
        }

        return next()
    }
}
