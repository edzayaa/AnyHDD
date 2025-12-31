export interface CartInterface {
    cart: {
        id: string;
        checkoutUrl: string;
    }
}

export interface CartCreateInterface {
    cartCreate: {
        cart: {
            id: string;
            checkoutUrl: string;
        }
        userErrors: {
            message: string;
        }[]
        warnings: {
            message: string;
        }[]
    }
}

export interface CartCreateResponseInterface {
    cart: {
        id: string;
        checkoutUrl: string;
    }
    action: 'create' | 'update';
    cartId?: string;
    warnings: {
        message: string;
    }[]
}

export interface CartAddInterface {
    cartLinesAdd: {
        cart: {
            id: string;
            checkoutUrl: string;
        }
        userErrors: {
            message: string;
        }[]
        warnings: {
            message: string;
        }[]
    }
}

export interface CartUpdateInterface {
    cartLinesUpdate: {
        cart: {
            id: string;
            checkoutUrl: string;
        }
        userErrors: {
            message: string;
        }[]
        warnings: {
            message: string;
        }[]
    }
}

export interface CartRemoveInterface {
    cartLinesRemove: {
        cart: {
            id: string;
            checkoutUrl: string;
        }
        userErrors: {
            message: string;
        }[]
        warnings: {
            message: string;
        }[]
    }
}

export interface CartDiscountCodesUpdateResponse {
    cartDiscountCodesUpdate: {
        cart?: CartInterface['cart'];
        userErrors: Array<{ code: string, message: string }>;
        warnings?: Array<{ message: string }>;
    };
}
