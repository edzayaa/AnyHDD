const basicProductFragment = `
    fragment ProductFragment on Product {
        handle
        title
        productType
        availableForSale
        featuredImage {
            url
            altText
        }
        priceRange {
            minVariantPrice {
                amount
            }
        }
        selectedOrFirstAvailableVariant {
            id
        }
    }
`

export const getCollection = `
    query getCollection($handle: String!) {
        collection(handle: $handle) {
            title
            products(first: 18) {
                edges {
                    node {
                        ...ProductFragment
                    }
                }
            }
        }
    }
    ${basicProductFragment}
`

export const getFilteredCollection = `
    query getFilteredCollection(
        $handle: String!,
        $first: Int,
        $after: String,
        $sortKey: ProductCollectionSortKeys,
        $reverse: Boolean,
        $filters: [ProductFilter!]
    ) {
        collection(handle: $handle) {
            title
            products(
                first: $first,
                after: $after,
                sortKey: $sortKey,
                reverse: $reverse,
                filters: $filters
            ) {
                edges {
                    node {
                        ...ProductFragment
                    }
                }
                filters {
                    id
                    label
                    type
                    values {
                        id
                        label
                        count
                        input
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
            }
        }
    }
    ${basicProductFragment}
`

export const bestSellingProducts = `
    query bestSellingProducts {
        products(first: 11, sortKey: BEST_SELLING) {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
    }
    ${basicProductFragment}
`

export const getFilteredProducts = `
    query getFilteredProducts(
        $first: Int,
        $after: String,
        $sortKey: ProductSortKeys,
        $reverse: Boolean,
        $filters: [ProductFilter!]
    ) {
        products(
            first: $first,
            after: $after,
            sortKey: $sortKey,
            reverse: $reverse,
            filters: $filters
        ) {
            edges {
                node {
                    ...ProductFragment
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
    ${basicProductFragment}
`