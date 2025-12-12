export interface CustomerUserErrors {
    message: string
    code: string
}

export interface ShopifyApiResponse<T = any> {
    data?: T;
    errors?: any;
}

export interface InputInterface {
    [key: string]: string
}