export class CartMapper {
    static toCartCreate(data: any) {
        const varianbles = {
            input: {
                lines: [
                    {
                        merchandiseId: data.merchandiseId,
                        quantity: data.quantity,
                    },
                ],
                buyerIdentity: {
                    countryCode: data.countryCode,
                },
            },
        }

        if (data.customerAccessToken) {
            Object.assign(varianbles.input.buyerIdentity, {
                customerAccessToken: data.customerAccessToken,
            })
        }
        return varianbles
    }
}