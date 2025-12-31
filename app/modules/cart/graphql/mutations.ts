const cartFragment = `
    fragment cartFragment on Cart {
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
`

export const cartCreate = `
    mutation cartCreate($input: CartInput!, $country: CountryCode) @inContext(country: $country) {
        cartCreate(input: $input) {
            cart {
                ...cartFragment
            }
            userErrors {
                message
            }
            warnings {
                message
            }
        }
    }  
    ${cartFragment}
`

export const cartLinesAdd = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...cartFragment
            }
            userErrors {
                message
            }
            warnings {
                message
            }
        }
    }
    ${cartFragment}
`

export const cartLinesRemove = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                ...cartFragment
            }
            userErrors {
                message
            }
            warnings {
                message
            }
        }
    }
    ${cartFragment}
`

export const cartLinesUpdate = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                ...cartFragment
            }
            userErrors {
                message
            }
            warnings {
                message
            }
        }
    }
    ${cartFragment}
`

export const cartDiscountCodesUpdate = `
    mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
            cart {
                ...cartFragment
            }
            userErrors {
                message
            }
            warnings {
                code
                message
            }
        }
    }
    ${cartFragment}
`