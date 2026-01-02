export interface ShopInterface {
    collection: {
        products: {
            edges: Array<{
                node: {
                    handle: string
                    title: string
                    productType: string
                    availableForSale: boolean
                    featuredImage: {
                        url: string
                        altText: string | null
                    } | null
                    priceRange: {
                        minVariantPrice: {
                            amount: string
                        }
                    }
                    selectedOrFirstAvailableVariant: {
                        id: string
                    }
                }
            }>
        }
    }
}

export interface BestSellingProductsInterface {
    products: {
        edges: Array<{
            node: {
                handle: string
                title: string
                productType: string
                availableForSale: boolean
                featuredImage: {
                    url: string
                    altText: string | null
                } | null
                priceRange: {
                    minVariantPrice: {
                        amount: string
                    }
                }
                selectedOrFirstAvailableVariant: {
                    id: string
                }
            }
        }>
    }
}

// Filter interfaces
export type ProductSortKey = 'BEST_SELLING' | 'CREATED_AT' | 'ID' | 'PRICE' | 'PRODUCT_TYPE' | 'RELEVANCE' | 'TITLE' | 'UPDATED_AT' | 'VENDOR'
export type ProductCollectionSortKey = 'BEST_SELLING' | 'COLLECTION_DEFAULT' | 'CREATED' | 'ID' | 'MANUAL' | 'PRICE' | 'RELEVANCE' | 'TITLE'

export interface ProductFilterInput {
    available?: boolean
    price?: {
        min?: number
        max?: number
    }
    productType?: string
    productVendor?: string
    tag?: string
    productMetafield?: {
        namespace: string
        key: string
        value: string
    }
}

export interface MetafieldFilter {
    namespace: string
    key: string
    value: string
}

export interface FilteredCollectionParams {
    handle: string
    first?: number
    last?: number
    after?: string
    before?: string
    sortKey?: ProductCollectionSortKey
    reverse?: boolean
    filters?: ProductFilterInput[]
    // Convenience params that will be converted to filters
    minPrice?: number
    maxPrice?: number
    productType?: string
    available?: boolean
    metafields?: MetafieldFilter[]
}

export interface FilterValue {
    id: string
    label: string
    count: number
    input: string
}

export interface Filter {
    id: string
    label: string
    type: string
    values: FilterValue[]
}

export interface FilteredCollectionInterface {
    collection: {
        title: string
        products: {
            edges: Array<{
                node: {
                    handle: string
                    title: string
                    productType: string
                    availableForSale: boolean
                    featuredImage: {
                        url: string
                        altText: string | null
                    } | null
                    priceRange: {
                        minVariantPrice: {
                            amount: string
                        }
                    }
                    selectedOrFirstAvailableVariant: {
                        id: string
                    }
                }
            }>
            filters: Filter[]
            pageInfo: {
                hasNextPage: boolean
                hasPreviousPage: boolean
                startCursor: string | null
                endCursor: string | null
            }
        }
    }
}

// Legacy interface - keep for backward compatibility
export interface FilteredProductsParams {
    first?: number
    after?: string
    sortKey?: ProductSortKey
    reverse?: boolean
    filters?: ProductFilterInput[]
    minPrice?: number
    maxPrice?: number
    productType?: string
    available?: boolean
    metafields?: MetafieldFilter[]
}

export interface FilteredProductsInterface {
    products: {
        edges: Array<{
            node: {
                handle: string
                title: string
                productType: string
                availableForSale: boolean
                featuredImage: {
                    url: string
                    altText: string | null
                } | null
                priceRange: {
                    minVariantPrice: {
                        amount: string
                    }
                }
                selectedOrFirstAvailableVariant: {
                    id: string
                }
            }
        }>
        pageInfo: {
            hasNextPage: boolean
            hasPreviousPage: boolean
            startCursor: string | null
            endCursor: string | null
        }
    }
}