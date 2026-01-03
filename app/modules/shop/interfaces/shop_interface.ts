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

export interface ProductInterface {
    product: {
        handle: string
        title: string
        description: string
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
            maxVariantPrice: {
                amount: string
            }
        }
        customFields?: { [key: string]: string | { value: string; references?: Array<Record<string, string>> } }
        images: {
            edges: Array<{
                node: {
                    url: string
                    altText: string | null
                }
            }>
        }
        compareAtPriceRange?: {
            minVariantPrice: {
                amount: string
            }
            maxVariantPrice: {
                amount: string
            }
        }
        descriptionHtml: string
        metafields: Array<{
            key: string
            value: string
        }> | null | undefined
        variants: {
            edges: Array<{
                node: {
                    id: string
                    title: string
                    price: string
                    availableForSale: boolean
                    selectedOptions: Array<{
                        name: string
                        value: string
                    }>
                }
            }>
        }
    }
}