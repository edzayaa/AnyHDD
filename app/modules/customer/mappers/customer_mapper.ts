export class CustomerMapper {
    static toUpdateCustomer(data: any) {
        const customer: any = {
            customerAccessToken: data.customerAccessToken,
            input: {}
        }
        
        if (data.firstName !== undefined && data.firstName !== null) {
            customer.input.firstName = data.firstName;
        }
        if (data.lastName !== undefined && data.lastName !== null) {
            customer.input.lastName = data.lastName;
        }
        if (data.email !== undefined && data.email !== null) {
            customer.input.email = data.email;
        }
        
        if (data.phone !== undefined && data.phone !== null) {
            let phone = data.phone.toString().replace(/[\s\(\)\-]/g, '');
            //let phone = data.phone.toString().trim();
            customer.input.phone = phone.startsWith('+') ? phone : `+${phone}`;
        }
        
        if (data.password !== undefined && data.password !== null) {
            customer.input.password = data.password;
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