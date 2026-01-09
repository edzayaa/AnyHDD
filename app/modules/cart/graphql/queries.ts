export const cart = `
    query cart($cartId: ID!) {
        cart(id: $cartId) {
            id
            checkoutUrl
            totalQuantity
            discountCodes {
                code
            }
            cost {
                subtotalAmount {
                    amount
                    currencyCode
                }
            }
            lines(first: 100) {
                nodes {
                    id
                    quantity
                    merchandise {
                        ... on ProductVariant {
                            id
                            title
                            product {
                                id
                                title
                                featuredImage {
                                    altText
                                    url
                                }
                                metafields(identifiers: [
                                    { key: "ar_version", namespace: "custom" },
                                    { key: "subtitle", namespace: "descriptors" },
                                ]) {
                                    key
                                    value
                                }
                            }
                        }
                    }
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }
`