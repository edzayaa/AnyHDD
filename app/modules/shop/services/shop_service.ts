import { inject } from "@adonisjs/core"
import StorefrontClient from "#shopify/storefront";
import * as queries from "#modules/shop/graphql/queries";
import * as Response from "#modules/shop/interfaces/shop_interface";

import JudgeClient from "#helpers/judge";
import { CustomerService } from "#modules/customer/services/customer_service";
import { processMetafields, processConnectivityMetafields } from "#modules/shop/utils/shop_utils";

@inject()
export class ShopService {
    private judgeClient: JudgeClient;

    constructor(
        private readonly storefront: StorefrontClient,
        customerService: CustomerService
    ) {
        this.judgeClient = new JudgeClient(customerService);
    }

    async getProducts(handle: string) {
        const data = await this.storefront.request(queries.getCollection, { handle }) as Response.ShopInterface;
        return data.collection
    }

    async getCollections() {
        const data = await this.storefront.request(queries.getCollections) as Response.CollectionsInterface;
        return data.collections
    }

    async getProductByHandle(handle: string) {
        const data = await this.storefront.request(queries.getProductByHandle, { handle }) as Response.ProductInterface;
        if (!data.product) return null;
        data.product.customFields = processMetafields(data.product.metafields);
        data.product.connectivity = processConnectivityMetafields(data.product.metafields);
        console.log('Processed Product:', data.product.customFields);
        return data.product
    }

    async getBestSellingProducts() {
        const data = await this.storefront.request(queries.bestSellingProducts) as Response.BestSellingProductsInterface;
        
        /*
        if (collectionHandle && collectionHandle !== 'all') {
            data.products.edges = data.products.edges.filter(edge => {
                const nodeWithCollections = edge.node as unknown as { collections?: { edges?: Array<{ node: { handle: string } }> } };
                const collections = nodeWithCollections.collections?.edges || [];
                return collections.some(col => col.node.handle === collectionHandle);
            });
        }
        */
        
        return data
    }

    async getFilteredCollection(params: Response.FilteredCollectionParams) {
        const filters: any[] = params.filters || []

        if (params.minPrice !== undefined || params.maxPrice !== undefined) {
            const priceFilter: any = { price: {} }
            if (params.minPrice !== undefined) priceFilter.price.min = params.minPrice
            if (params.maxPrice !== undefined) priceFilter.price.max = params.maxPrice
            filters.push(priceFilter)
        }

        if (params.productType) {
            filters.push({ productType: params.productType })
        }

        if (params.available !== undefined) {
            filters.push({ available: params.available })
        }

        if (params.metafields && params.metafields.length > 0) {
            for (const mf of params.metafields) {
                filters.push({
                    productMetafield: {
                        namespace: mf.namespace,
                        key: mf.key,
                        value: mf.value
                    }
                })
            }
        }

        const handle = params.handle || 'all'

        const variables: any = {
            handle,
            sortKey: params.sortKey || 'COLLECTION_DEFAULT',
            reverse: params.reverse || false,
            filters: filters.length > 0 ? filters : undefined
        }

        if (params.before) {
            variables.last = params.last || 18
            variables.before = params.before
        } else {
            variables.first = params.first || 18
            if (params.after) {
                variables.after = params.after
            }
        }

        const data = await this.storefront.request(queries.getFilteredCollection, variables) as Response.FilteredCollectionInterface
        return data
    }

    async searchProducts(query: string, paginationData?: { nextCursor?: string, previousCursor?: string, limit?: number }) {
        const variables: any = { query };
        
        if (paginationData?.nextCursor) {
            variables.after = paginationData.nextCursor;
            variables.first = paginationData.limit || 18;
        } else if (paginationData?.previousCursor) {
            variables.before = paginationData.previousCursor;
            variables.last = paginationData.limit || 18;
            variables.first = null;
        } else {
            variables.first = paginationData?.limit || 18;
        }
        
        const data = await this.storefront.request(queries.searchProducts, variables) as Response.SearchProductsInterface;
        return data
    }

    async predictiveSearch(query: string) {
        const data = await this.storefront.request(queries.predictiveSearch, { query }) as Response.PredictiveSearchInterface;
        return data
    }

    async reviews(productId: string, page: string) {
        const result = await this.judgeClient.reviews(productId, page);
        return result;
    }

    async createReview(body: Record<string, any>, accessToken?: string) {
        return this.judgeClient.createReview(body, accessToken);
    }

}