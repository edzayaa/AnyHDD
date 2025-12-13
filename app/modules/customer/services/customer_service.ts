import StorefrontClient from "#shopify/storefront";

// Mutations
import * as mutations from "#modules/customer/graphql/mutations"
import * as queries from "#modules/customer/graphql/queries"

// Interfaces
import { InputInterface } from "#interfaces/shopify_interface"
import * as Response from "#modules/customer/interfaces/customer_interface"

// Validators
import { 
    defaultAddressValidtor,
} from "#modules/customer/validators/customer_validator";

// Helpers
import handleUserErrors from "#helpers/user_errors"

// Mappers
import { CustomerMapper } from "#modules/customer/mappers/customer_mapper"

export class CustomerService {
    constructor(private storefront: StorefrontClient) {}

    private async updateDefaultAddress(body: InputInterface) {
        const payload = await defaultAddressValidtor.validate(body)
        const variables = CustomerMapper.toUpdateDefaultAddress(payload)
        const data = await this.storefront.request(mutations.customerDefaultAddressUpdate, variables) as Response.UpdateAddressInterface
        const customerData = data.customerDefaultAddressUpdate
        handleUserErrors(customerData.customerUserErrors)
        return payload
    }

    async getCustomer(customerAccessToken: string) {
        const data = await this.storefront.request(queries.customer, { customerAccessToken }) as Response.CustomerInterface
        return data.customer
    }

    async getCustomerAddresses(customerAccessToken: string) {
        const data = await this.storefront.request(queries.customerAddresses, { customerAccessToken }) as Response.CustomerAddressesInterface
        const addresses = data.customer?.addresses.edges
        if (addresses.length === 0) return []
        const defaultAddressId = data.customer.defaultAddress.id

        addresses.forEach((address) => {
            (address.node as any).isDefault = address.node.id === defaultAddressId
        })

        addresses.sort((a, b) => {
            if (a.node.id === defaultAddressId) return -1
            if (b.node.id === defaultAddressId) return 1
            return 0
        })

        return {
            displayName: data.customer.displayName,
            addresses: [...addresses]
        }
    }

    async updateCustomer(payload: InputInterface) {
        const variables = CustomerMapper.toUpdateCustomer(payload)
        const data = await this.storefront.request(mutations.customerUpdate, variables) as Response.UpdateCustomerInterface
        const customerData = data.customerUpdate
        handleUserErrors(customerData.customerUserErrors)
        return { data: customerData.customer, updatePassword: payload.password ? true : false }
    }

    async updatePassword(payload: InputInterface) {
        const variables = CustomerMapper.toUpdatePassword(payload)
        const data = await this.storefront.request(mutations.customerUpdate, variables) as Response.UpdateCustomerInterface
        const customerData = data.customerUpdate
        handleUserErrors(customerData.customerUserErrors)
        return payload
    }

    async createAddress(payload: any) {
        const variables = CustomerMapper.toCreateAddress(payload)
        const data = await this.storefront.request(mutations.customerAddressCreate, variables) as Response.CreateAddressInterface
        const customerData = data.customerAddressCreate
        handleUserErrors(customerData.customerUserErrors)
        if (payload.address.isDefault) {
            await this.updateDefaultAddress({
                customerAccessToken: payload.customerAccessToken,
                addressId: customerData.customerAddress.id
            })
        }
        return payload
    }
}