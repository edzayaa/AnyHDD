import { CustomerUserErrors } from "#interfaces/shopify_interface";

export interface CustomerInterface {
    customer: {
        id: string
        firstName: string
        lastName: string
        displayName: string
        email: string
        phone: string
        defaultAddress: {
            id: string
        }
        addresses: {
            edges: {
                node: object
            }[]
        }
        orders: {
            edges: {
                node: {
                    orderNumber: string
                    financialStatus: string
                    fulfillmentStatus: string
                    totalPrice: {
                        amount: string
                        currencyCode: string
                    }
                }
            }
        }
    }
}

export interface CustomerAddressesInterface {
    customer: {
        displayName: string
        defaultAddress: {
            id: string
        }
        addresses: {
            edges: {
                node: {
                    id: string
                    isDefaultAddress: boolean
                }
            }[]
        }
    }
}

export interface UpdateCustomerInterface {
    customerUpdate: {
        customer: {
            firstName: string
            lastName: string
            email: string
            phone: string
        }
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface CreateAddressInterface {
    customerAddressCreate: {
        customerAddress: {
            id: string
        }
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface UpdateAddressInterface {
    customerDefaultAddressUpdate: {
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface FindCustomerInterface {
    customers: {
        nodes: {
            id: string
            email: string
            defaultEmailAddress: {
                marketingState: string
            }
        }[]
    }
}

export interface SubscribeToMarketingInterface {
    customerEmailMarketingConsentUpdate: {
        userErrors: CustomerUserErrors[]
    }
}

export interface CreateCustomerInterface {
    customerCreate: {
        userErrors: CustomerUserErrors[]
    }
}

export interface DeleteCustomerAccessTokenInterface {
    customerAccessTokenDelete: {
        userErrors: CustomerUserErrors[]
    }
}