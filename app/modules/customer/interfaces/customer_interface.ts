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

export interface CustomerAddressNode {
    id: string
    name: string
    firstName: string
    lastName: string
    address1: string
    address2: string | null
    city: string
    country: string
    countryCodeV2: string
    company: string | null
    formatted: string[]
    latitude: number | null
    longitude: number | null
    phone: string | null
    province: string | null
    provinceCode: string | null
    zip: string | null
}

export interface CreateAddressInterface {
    customerAddressCreate: {
        customerAddress: CustomerAddressNode
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface UpdateDefaultAddressInterface {
    customerDefaultAddressUpdate: {
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface UpdateAddressInterface {
    customerAddressUpdate: {
        customerAddress: CustomerAddressNode
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

export interface DeleteAddressInterface {
    customerAddressDelete: {
        deletedCustomerAddressId: string
        customerUserErrors: CustomerUserErrors[]
    }
}