import ApiClient from './client.js';
import { endpoints } from './variables.js';

const cartBtn = document.querySelector('#cartBtn');

class CartManager extends ApiClient {
    constructor() {
        super();
        this.cart = [];
        this.subtotal = '0.00';
        this.checkoutUrl = null;
        this.discountCodes = [];

        this.couponCode = '';
    }

    async initCart() {
        await this.getCart();
        window.addEventListener('cart:opened', () => this.getCart());
        window.addEventListener('cart:updated', (e) => this.updateCartData(e.detail));
    }

    updateCartData(data) {
        this.cart = data.lines?.nodes || [];
        this.subtotal = data.cost?.subtotalAmount?.amount || '0.00';
        this.checkoutUrl = data.checkoutUrl;
        this.discountCodes = data.discountCodes || [];
    }

    updateCartUI(cartData) {
        window.dispatchEvent(new CustomEvent('cart:updated', {
            detail: cartData
        }));
    }

    checkWarnings(data) {
        if (data?.warnings?.length > 0) {
            alert(data.warnings[0].message);
        }
    }

    async getCart() {
        const { success, data } = await this.get(endpoints.cart);
        if (!success) {
            this.cart = [];
            this.subtotal = '0.00';
            this.checkoutUrl = null;
            return;
        }
        this.updateCartData(data);
    }

    async addToCart(merchandiseId, quantity = 1) {
        const { data, success } = await this.post(endpoints.cart, { merchandiseId, quantity });

        if (success) {
            this.checkWarnings(data);
            this.updateCartUI(data.cart);
            Alpine.store('product').quantity = 1;
            if (cartBtn) cartBtn.click();
        } else {
            alert(data?.error || 'Error adding to cart');
        }
    }

    async updateCart(lineId, quantity) {
        if (typeof quantity !== 'number') return;
        if (quantity <= 0) return this.removeFromCart(lineId);

        const { data, success } = await this.patch(endpoints.cart, { lineId, quantity });

        if (success) {
            this.checkWarnings(data);
            this.updateCartUI(data.cart);
        } else {
            alert(data?.error || 'Error updating cart');
        }
    }

    async removeFromCart(lineId) {
        const { data, success } = await this.delete(`${endpoints.cart}?lineId=${lineId}`);
        if (success) {
            this.checkWarnings(data);
            this.updateCartUI(data.cart);
        }
    }

    async applyDiscountCodes() {
        if (!this.couponCode) return;

        const { data, success } = await this.post(`${endpoints.cart}/discount-codes`, {
            discountCodes: [this.couponCode],
        });

        if (success) {
            this.checkWarnings(data);
            this.updateCartUI(data.cart);
            this.couponCode = '';
        } else {
            alert(data?.error || 'Invalid or expired coupon');
        }
    }

    async checkout() {
        if (!this.canCheckout) return;
        window.location.href = this.checkoutUrl;
    }

    get canCheckout() {
        return this.cart.length > 0 && this.checkoutUrl && !this.loading;
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.store('product', { quantity: 1 });
    Alpine.data('cartManager', () => new CartManager());
});