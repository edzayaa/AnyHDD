import { AdminApiClient, createAdminApiClient } from '@shopify/admin-api-client';
import env from "#start/env";
import { BadRequestException } from '#exceptions/common';

export default class AdminClient {
    private admin: AdminApiClient;

    constructor() {
        this.admin = createAdminApiClient({
            storeDomain: env.get('SHOPIFY_STORE_DOMAIN'),
            accessToken: env.get('SHOPIFY_ADMIN_ACCESS_TOKEN'),
            apiVersion: env.get('SHOPIFY_API_VERSION')
        });
    }

    async request<T>(query: string, variables?: Record<string, unknown>) {
        try {
            const { data, errors } = await this.admin.request<T>(query, {variables})
            console.log('Shopify Admin API Response:', { data, errors });
            if (errors) throw new BadRequestException(errors?.graphQLErrors?.[0].message);
            return data as T;
        } catch (error) {
            console.error('Shopify Admin API Error:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error(error);
        }
    }
}