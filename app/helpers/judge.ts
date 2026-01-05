import { inject } from '@adonisjs/core';
import env from '#start/env'

import { CustomerService }from '#modules/customer/services/customer_service';
import { JudgeInternalProduct } from '#modules/shop/interfaces/shop_interface';

import { productIdValidator, reviewValidator } from '#modules/shop/validators/shop_validator';

import { BadRequestException } from '#exceptions/common';

@inject()
export default class JudgeClient {
    private apiKey: string;
    private apiUrl: string;
    private shopDomain: string;
    
    constructor(private readonly customerService: CustomerService) {
        this.apiUrl = env.get('JUDGE_API_URL');
        this.apiKey = env.get('JUDGE_API_KEY');
        this.shopDomain = env.get('SHOPIFY_STORE_DOMAIN');
    }

    formatProductId(shopifyProductId: string): string {
        const parts = shopifyProductId.split('/');
        return parts[parts.length - 1];
    }   

    async getInternalProduct(productId: string) {
        const response = await fetch(`${this.apiUrl}/products/-1?shop_domain=${this.shopDomain}&api_token=${this.apiKey}&external_id=${productId}`);
        const data = await response.json();
        return data;
    }

    async reviews(productId: string, page = '1') {
        const payload = await productIdValidator.validate({ productId, page });
        const formattedProductId = this.formatProductId(payload.productId);
        const { product, error } = await this.getInternalProduct(formattedProductId) as JudgeInternalProduct;
        if (error) throw new BadRequestException(error);
        
        const perPage = 100;
        let url = `${this.apiUrl}/reviews?shop_domain=${this.shopDomain}&api_token=${this.apiKey}&product_id=${product.id}&per_page=${perPage}&page=1`;
        
        const response = await fetch(url);
        const data = await response.json() as { reviews: any[], current_page: number };

        return data.reviews
    }

    async createReview(body: Record<string, any>, accessToken?: string) {
        const formattedProductId = this.formatProductId(body.productId);
        const payload = await reviewValidator.validate(body);
        if (accessToken) {
            const customer = await this.customerService.getCustomer(accessToken);
            if (customer) {
                payload.name = customer.displayName;
                payload.email = customer.email;
            }
        }
        
        const requestBody: any = {
            shop_domain: this.shopDomain,
            platform: 'shopify',
            id: formattedProductId,
            email: payload.email,
            name: payload.name,
            rating: payload.rating,
            body: payload.content,
            reviewer_name_format: 'all_initials',
        };

        const response = await fetch(`${this.apiUrl}/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorObj = errorData as { message?: string };
            throw new BadRequestException(errorObj.message || 'Failed to create review');
        }

        const responseData = await response.json() as {
            review?: {
                reviewer?: { name?: string };
                rating?: number;
                body?: string;
            }
        };
        
        return {
            reviewer: { 
                name: responseData.review?.reviewer?.name || payload.name 
            },
            rating: responseData.review?.rating || payload.rating,
            body: responseData.review?.body || payload.content
        }
    }
}