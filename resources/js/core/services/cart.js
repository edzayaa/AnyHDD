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
        this.variantId = null;

        this.price = null;
        this.priceRaw = null;
        this.compareAtPrice = null;
        this.compareAtPriceRaw = null;
        this.priceContainer = null;
        this.priceTextNode = null;
    }

    init() {
        this.initializePricing();
    }

    initializePricing() {
        if (this.$el?.dataset?.defaultVariantId) {
            this.variantId = this.$el.dataset.defaultVariantId;
        }

        const priceContainer = this.$el ? this.$el.querySelector('.prices') : null;
        if (!priceContainer) return;

        this.priceContainer = priceContainer;

        const { defaultPrice, defaultCompare } = priceContainer.dataset;
        this.setPricing(defaultPrice, defaultCompare);

        const activeButton = this.$el.querySelector('.condition-btn.active');
        if (!activeButton) return;

        this.variantId = activeButton.dataset.variantId || this.variantId;
        this.setPricing(activeButton.dataset.price, activeButton.dataset.compare);
    }

    selectVariant(event) {
        const target = event?.currentTarget;
        if (!target) return;

        const { variantId, price, compare } = target.dataset;

        if (variantId) {
            this.variantId = variantId;
        }

        this.setPricing(price, compare);
    }

    setPricing(price, compare) {
        this.price = this.normalizeMoneyValue(price);
        this.priceRaw = this.normalizeRawMoney(price);

        if (compare !== undefined) {
            this.compareAtPrice = this.normalizeMoneyValue(compare);
            this.compareAtPriceRaw = this.normalizeRawMoney(compare);
        }

        this.renderPrice();
    }

    get formattedPrice() {
        const raw = this.resolveMoneyRaw(this.priceRaw, 'defaultPrice');
        return this.formatDisplayValue(raw);
    }

    get formattedComparePrice() {
        const raw = this.resolveMoneyRaw(this.compareAtPriceRaw, 'defaultCompare');
        return this.formatDisplayValue(raw);
    }

    get showComparePrice() {
        const price = this.resolveMoneyValue(this.price, 'defaultPrice');
        const compare = this.resolveMoneyValue(this.compareAtPrice, 'defaultCompare');

        return typeof price === 'number'
            && typeof compare === 'number'
            && compare > price;
    }

    normalizeMoneyValue(value) {
        if (value === undefined || value === null) return null;
        const trimmed = `${value}`.trim();
        if (trimmed === '') return null;

        const parsed = Number(trimmed);
        return Number.isFinite(parsed) ? parsed : null;
    }

    normalizeRawMoney(value) {
        if (value === undefined || value === null) return null;
        const trimmed = `${value}`.trim();
        return trimmed === '' ? null : trimmed;
    }

    formatDisplayValue(value) {
        if (value === null || value === undefined) return '';
        const trimmed = `${value}`.trim();
        if (trimmed === '') return '';
        return trimmed.startsWith('$') ? trimmed : `$${trimmed}`;
    }

    resolveMoneyValue(sourceValue, datasetKey) {
        if (typeof sourceValue === 'number' && !Number.isNaN(sourceValue)) {
            return sourceValue;
        }

        const container = this.priceContainer || (this.$el ? this.$el.querySelector('.prices') : null);
        if (!container) return null;

        const datasetValue = container.dataset?.[datasetKey];
        return this.normalizeMoneyValue(datasetValue);
    }

    resolveMoneyRaw(sourceValue, datasetKey) {
        const raw = this.normalizeRawMoney(sourceValue);
        if (raw !== null) {
            return raw;
        }

        const container = this.priceContainer || (this.$el ? this.$el.querySelector('.prices') : null);
        if (!container) return null;

        const datasetValue = container.dataset?.[datasetKey];
        return this.normalizeRawMoney(datasetValue);
    }

    registerPriceNode(element) {
        this.priceTextNode = this.findPriceTextNode(element);
        this.renderPrice();
    }

    findPriceTextNode(element) {
        if (!element) return null;

        const childNodes = Array.from(element.childNodes || []);

        for (let index = childNodes.length - 1; index >= 0; index -= 1) {
            const node = childNodes[index];
            if (node.nodeType === 3 && node.textContent && node.textContent.trim() !== '') {
                return node;
            }
        }

        for (let index = childNodes.length - 1; index >= 0; index -= 1) {
            const node = childNodes[index];
            if (node.nodeType === 3) {
                return node;
            }
        }

        const textNode = document.createTextNode('');
        element.appendChild(textNode);
        return textNode;
    }

    renderPrice() {
        if (!this.priceTextNode) return;

        const price = this.formattedPrice;
        if (!price) {
            this.priceTextNode.textContent = '';
            return;
        }

        this.priceTextNode.textContent = ` ${price}`;
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

    async addToCart(variantId = null) {
        let merchandiseId = this.variantId;
        let quantity = Alpine.store('product').quantity || 1;

        if (!merchandiseId) {
            merchandiseId = variantId;
        };

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

class SearchManager {
    constructor() {
        this.searchQuery = '';
    }

    searchProducts(query) {
        if (!query || query.trim() === '') return;
        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.store('product', { quantity: 1 });
    Alpine.data('cartManager', () => new CartManager());
    Alpine.data('searchManager', () => new SearchManager());
});