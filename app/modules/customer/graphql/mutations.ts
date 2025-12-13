export const customerUpdate = `
    mutation customerUpdate($customerAccessToken: String!, $input: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $input) {
            customer {
                firstName
                lastName
                email
                phone
            }
            customerUserErrors {
                code
                message
            }
        }
    }
`

export const customerAddressCreate = `
    mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
            customerAddress {
                id
            }
            customerUserErrors {
                code
                message
            }
        }
    }
`

export const customerDefaultAddressUpdate = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
        customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
            customer {
                id
            }
            customerUserErrors {
                code
                message
            }
        }
    }
`

export const customerCreateSubscribed = `
    mutation customerCreate($email: String!) {
        customerCreate(input: {email: $email, emailMarketingConsent: {marketingState: SUBSCRIBED, marketingOptInLevel: CONFIRMED_OPT_IN}}) {
            userErrors {
                message
            }
        }
    }
`

export const customerEmailMarketingConsentUpdate = `
    mutation customerEmailMarketingConsentUpdate($customerId: ID!) {
        customerEmailMarketingConsentUpdate(
            input: { 
                customerId: $customerId, 
                emailMarketingConsent: {
                    marketingState: SUBSCRIBED, 
                    marketingOptInLevel: CONFIRMED_OPT_IN
                }
          }
        ) {
            userErrors {
                message
            }
        }
    }
`

export const customerAccessTokenDelete = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            userErrors {
                message
            }
        }
    }
`
    