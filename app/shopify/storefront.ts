import { createStorefrontApiClient, StorefrontApiClient } from "@shopify/storefront-api-client";
import env from "#start/env";

import { ShopifyApiResponse } from "#interfaces/shopify_interface";
import { BadRequestException } from "#exceptions/common";

export default class StorefrontClient {
    private storefront: StorefrontApiClient;

    constructor() {
        this.storefront = createStorefrontApiClient({
            storeDomain: env.get('SHOPIFY_STORE_DOMAIN'),
            privateAccessToken: env.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN'),
            apiVersion: env.get('SHOPIFY_API_VERSION')
        });
    }

    async request<T>(query: string, variables: Record<string, any> = {}, buyerIp: string | null = null): Promise<T> {
        try {
            const options = {
                variables,
                headers: buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : undefined
            };
            const { data, errors } = await this.storefront.request(query, options) as ShopifyApiResponse;
            if (errors) throw new BadRequestException(errors?.graphQLErrors?.[0].message);                
            return data as T;
        } catch (error) {
           if (error instanceof BadRequestException) {
               throw error;
           }
           throw new Error(error);
        }
    }
}