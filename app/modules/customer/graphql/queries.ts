export const customer = `
    query customer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            firstName
            lastName
            displayName
            email
            phone
            orders (first: 100, reverse: true) {
                edges {
                    node {
                        orderNumber
                        financialStatus
                        fulfillmentStatus
                        totalPrice {
                            amount
                            currencyCode
                        }
                        processedAt  
                        statusUrl
                        lineItems(first: 2) {
                            edges {
                                node {
                                    title
                                    quantity
                                    variant {
                                        id
                                        price {
                                            amount
                                            currencyCode
                                        }
                                        image {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const customerAddresses = `
    query customerAddresses($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            displayName
            defaultAddress {
                id
            }
            addresses (first: 50, reverse: true) {
                edges {
                    node {
                        id
                        name
                        firstName
                        lastName
                        company
                        address1
                        address2
                        city
                        country
                        countryCodeV2
                        formatted
                        latitude
                        longitude
                        phone
                        province
                        provinceCode
                        zip
                    }
                }
            }
        }
    }
`
        
export const findCustomer = `
    query findCustomer($query: String!) {
        customers(query: $query, first: 1) {
            nodes {
                id
                defaultEmailAddress {
                    marketingState
                }
            }
        }
    }
`