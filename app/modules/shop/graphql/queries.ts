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

export const getFilteredCollection = `
    query getFilteredCollection(
        $handle: String!,
        $first: Int,
        $last: Int,
        $after: String,
        $before: String,
        $sortKey: ProductCollectionSortKeys,
        $reverse: Boolean,
        $filters: [ProductFilter!]
    ) {
        collection(handle: $handle) {
            title
            products(
                first: $first,
                last: $last,
                after: $after,
                before: $before,
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

export const getProductByHandle = `
    query product($handle: String!) {
        product(handle: $handle) {
            id
            title
            handle
            description
            descriptionHtml
            compareAtPriceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
            priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
            images(first: 20) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        title
                        availableForSale
                        price {
                            amount
                            currencyCode
                        }
                    }
                }
            }
            metafields(identifiers: [
                { key: "about", namespace: "custom" },
                { key: "methods_of_use", namespace: "custom" },
                { key: "package_items", namespace: "custom" },
                { key: "warning", namespace: "custom" },
                { key: "product_benefits", namespace: "custom" }
            ]) {
                key
                value
                references(first: 4) {
                    edges {
                        node {
                            ... on Metaobject {
                                fields {
                                    key
                                    value
                                    reference {
                                        ... on MediaImage {
                                            image {
                                                url
                                                altText
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            selectedOrFirstAvailableVariant {
                id
                price {
                    amount
                    currencyCode
                }
            }
        }
    }
`

export const searchProducts = `
    query searchProducts(
        $query: String!,
        $first: Int = 18,
        $last: Int,
        $after: String,
        $before: String,
        $sortKey: SearchSortKeys,
        $reverse: Boolean,
    ) {
        search(
            query: $query,
            first: $first,
            last: $last,
            after: $after,
            before: $before,
            sortKey: $sortKey,
            reverse: $reverse,
        ) {
            edges {
                node {
                    ... on Product {
                        ...ProductFragment
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            totalCount
        }
    }
    ${basicProductFragment}
`