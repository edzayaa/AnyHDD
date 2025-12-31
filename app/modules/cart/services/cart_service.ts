import { inject } from "@adonisjs/core";
import StorefrontClient from "#shopify/storefront";

// Interfaces
import { 
    CartCreateInterface,
    CartAddInterface, 
    CartInterface, 
    CartUpdateInterface, 
    CartRemoveInterface,
    CartDiscountCodesUpdateResponse
} from "#modules/cart/interfaces/cart_interface";

// Validators
import { 
    cartIdValidator, 
    cartRemoveValidator, 
    cartUpdateValidator, 
    cartValidator,
    cartDiscountCodesUpdateValidator 
} from "#modules/cart/validators/cart_validator";

// Graphql
import * as mutations from "#modules/cart/graphql/mutations";
import * as queries from "#modules/cart/graphql/queries";

// Mappers
import { CartMapper } from "#modules/cart/mappers/cart_mapper";

// Helpers
import handleUserErrors from "#helpers/user_errors"

interface UserErrors {
    code: string;
    message: string;
}

@inject()
export default class CartService {
    constructor(private storefront: StorefrontClient) {}

    async cart(cartId: string) {
        const payload = await cartIdValidator.validate({ cartId })
        const data = await this.storefront.request(queries.cart, { cartId: payload.cartId }) as CartInterface
        return data.cart
    }

    async create(body: Record<string, any>, customerAccessToken?: string) {
        const variables = CartMapper.toCartCreate({ ...body, customerAccessToken })
        const data = await this.storefront.request(mutations.cartCreate, variables) as CartCreateInterface
        const userErrors = data.cartCreate.userErrors as UserErrors[]
        handleUserErrors(userErrors)
        return data.cartCreate
    }

    async add(cartId: string, body: Record<string, any>, customerAccessToken?: string) {
        const payload = await cartValidator.validate({ cartId, ...body })
        if (!payload.cartId) return this.create(payload, customerAccessToken)
        const variables = { cartId: payload.cartId, lines: [{merchandiseId: payload.merchandiseId, quantity: payload.quantity }]}
        const data = await this.storefront.request(mutations.cartLinesAdd, variables) as CartAddInterface
        const userErrors = data.cartLinesAdd.userErrors as UserErrors[]
        handleUserErrors(userErrors)
        return data.cartLinesAdd
    }

    async remove(cartId: string, lineId: string) {
        const payload = await cartRemoveValidator.validate({ cartId, lineId })
        const variables = { cartId: payload.cartId, lineIds: [payload.lineId] }
        const data = await this.storefront.request(mutations.cartLinesRemove, variables) as CartRemoveInterface
        const userErrors = data.cartLinesRemove.userErrors as UserErrors[]
        handleUserErrors(userErrors)
        return data.cartLinesRemove
    }

    async update(cartId: string, body: Record<string, any>) {
        const payload = await cartUpdateValidator.validate({ cartId, ...body })
        const variables = { cartId: payload.cartId, lines: [{ id: payload.lineId, quantity: payload.quantity }]}
        const data = await this.storefront.request(mutations.cartLinesUpdate, variables) as CartUpdateInterface
        const userErrors = data.cartLinesUpdate.userErrors as UserErrors[]
        handleUserErrors(userErrors)
        return data.cartLinesUpdate
    }

    async cartDiscountCodesUpdate(cartId: string, discountCodes: string[]) {
        const payload = await cartDiscountCodesUpdateValidator.validate({ cartId, discountCodes })
        const data = await this.storefront.request(
            mutations.cartDiscountCodesUpdate,
            payload
        ) as CartDiscountCodesUpdateResponse;
        const userErrors = data.cartDiscountCodesUpdate.userErrors;
        handleUserErrors(userErrors);
        return data.cartDiscountCodesUpdate;
    }
}