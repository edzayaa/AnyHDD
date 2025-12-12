export default class AuthMapper {
    static toAuth(data: any) {
        return {
            input: data
        }
    }

    static toForgotPassword(data: any) {
        return {
            email: data.email
        }
    }

    static toResetPassword(data: any) {
        return {
            id: `gid://shopify/Customer/${data.customerId}`,
            input: {
                resetToken: data.resetToken,
                password: data.password
            }
        }
    }

    static toActivateAccount(data: any) {
        return {
            id: `gid://shopify/Customer/${data.customerId}`,
            input: {
                activationToken: data.activateToken,
                password: data.password
            }
        }
    }
}