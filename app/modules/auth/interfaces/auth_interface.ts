import { CustomerUserErrors } from "#interfaces/shopify_interface";
    
export interface RegisterInterface {
    customerCreate: {
        customer: {
            email: string
            createdAt: string
        }
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface LoginInterface {
    customerAccessTokenCreate: {
        customerAccessToken: {
            accessToken: string
        }
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface ForgotPasswordInterface {
    customerRecover: {
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface ResetPasswordInterface {
    customerReset: {
        customerUserErrors: CustomerUserErrors[]
    }
}

export interface ActivateAccountInterface {
    customerActivate: {
        customerUserErrors: CustomerUserErrors[]
    }
}