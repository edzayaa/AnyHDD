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

        let reviews: any[] = []
        try {
            const fetchedReviews = await this.shopService.reviews(data.id, '1')
            reviews = Array.isArray(fetchedReviews) ? fetchedReviews : []
        } catch (error) {
            console.error('Error fetching reviews:', error)
            reviews = []
        }

        const reviewSummary = this.buildReviewSummary(reviews)

        return view.render('pages/shop/product', { product: data, reviews, reviewSummary })
    }

    private buildReviewSummary(reviews: Array<{ rating?: number }> = []) {
        const ratingLabels: Record<number, string> = {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
        }

        const ratingCounts: Record<number, number> = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        }

        let totalScore = 0

        for (const review of reviews) {
            const parsedRating = Number(review?.rating) || 0
            const normalizedRating = Math.min(5, Math.max(1, Math.round(parsedRating)))
            ratingCounts[normalizedRating] += 1
            totalScore += normalizedRating
        }

        const totalReviews = reviews.length
        const averageRating = totalReviews > 0 ? totalScore / totalReviews : 0
        const averageRatingFormatted = averageRating.toFixed(1)

        const breakdown = [5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating]
            const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
            return {
                rating,
                label: ratingLabels[rating],
                count,
                percentage,
            }
        })

        return {
            totalReviews,
            averageRating,
            averageRatingFormatted,
            totalScore,
            breakdown,
        }
    }

    async search({ request, view }: HttpContext) {
        const query = request.input('q', '')
        if (!query) {
            return view.render('pages/errors/not_found')
        }
        
        const nextCursor = request.input('nextCursor')
        const previousCursor = request.input('previousCursor')
        const limit = request.input('limit', 18)
        
        const data = await this.shopService.searchProducts(query, {
            nextCursor,
            previousCursor,
            limit: Number(limit)
        }) as any
        
        return view.render('pages/shop/search', { products: data.search, query })
    }
}