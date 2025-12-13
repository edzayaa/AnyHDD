export class CustomerMapper {
    static toUpdateCustomer(data: any) {
        const customer: any = {
            customerAccessToken: data.customerAccessToken,
            input: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            }
        }
        if (data.prefixCode && data.phone) {
            const prefix = data.prefixCode.toString();
            let rawPhone = data.phone.toString().replace(/^\+/, '');
            const prefixRegex = new RegExp(`^${prefix}`);
            if (prefixRegex.test(rawPhone)) {
                customer.input.phone = `+${rawPhone}`;
            } else {
                customer.input.phone = `+${prefix}${rawPhone}`;
            }
        }
        return customer
    }

    static toCreateAddress(data: any) {
        const address: any = {
            firstName: data.address.firstName,
            lastName: data.address.lastName,
            address1: data.address.address1,
            address2: data.address.address2,
            city: data.address.city,
            country: data.address.country,
            province: data.address.province,
            zip: data.address.zip,
        };

        if (data.address.prefixCode && data.address.phone) {
            const prefix = data.address.prefixCode.toString();
            let rawPhone = data.address.phone.toString().replace(/^\+/, '');
            const prefixRegex = new RegExp(`^${prefix}`);
            if (prefixRegex.test(rawPhone)) {
                address.phone = `+${rawPhone}`;
            } else {
                address.phone = `+${prefix}${rawPhone}`;
            }
        }

        return {
            customerAccessToken: data.customerAccessToken,
            address
        }
    }

    static toUpdateDefaultAddress(data: any) {
        return {
            customerAccessToken: data.customerAccessToken,
            addressId: data.addressId
        }
    }

    static toUpdatePassword(data: any) {
        return {
            customerAccessToken: data.customerAccessToken,
            input: {
                password: data.newPassword
            }   
        }
    }

    static sanitizeCustomerData(customerAccessToken: string, data: any) {
        return {
            customerAccessToken,
            ...data
        }
    }
}