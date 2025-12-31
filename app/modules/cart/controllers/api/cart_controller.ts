import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import CartService from "#modules/cart/services/cart_service";

import { CartCreateResponseInterface } from "#modules/cart/interfaces/cart_interface";

@inject()
export class CartApiController {
    constructor(private cartService: CartService) {}

    async cart({ request, response }: HttpContext) {
        const cartId = request.cookie('cartId')
        if (!cartId) {
            return response.badRequest({ message: 'Cart ID is required' });
        }
        return response.ok(await this.cartService.cart(cartId));
    }

    async add({ request, response }: HttpContext) {
        const cartId = request.cookie('cartId');
        const customerAccessToken = request.cookie('accessToken');
        const data = await this.cartService.add(cartId, request.body(), customerAccessToken) as unknown as CartCreateResponseInterface
        if (!cartId) {
            response.cookie('cartId', data.cart.id, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 30 * 30
            })
        }
        return response.ok(data)
    }

    async remove({ request, response }: HttpContext) {
        return response.ok(await this.cartService.remove(request.cookie('cartId'), request.qs().lineId))
    }

    async update({ request, response }: HttpContext) {
        return response.ok(await this.cartService.update(request.cookie('cartId'), request.body()))
    }

    async cartDiscountCodesUpdate({ request, response }: HttpContext) {
        return response.ok(
            await this.cartService.cartDiscountCodesUpdate(
                request.cookie('cartId'),
                request.body().discountCodes
            )
        );
    }
}