import vine from "@vinejs/vine";

const nameRegex = /^[\p{L}\p{M}'\-\s]+$/u;

export const customerValidator = vine.compile(
    vine.object({
        customerAccessToken: vine.string().trim(),
        firstName: vine.string().trim().minLength(2).maxLength(20).regex(nameRegex).optional(),
        lastName: vine.string().trim().minLength(2).maxLength(20).regex(nameRegex).optional(),
        email: vine.string().trim().email().optional(),
        phone: vine.string().trim().regex(/^\+?[\d\s\(\)\-]{7,20}$/).optional(),
        password: vine.string().trim().minLength(6).optional(),
        confirmPassword: vine.string().trim().minLength(6).sameAs('password').optional(),
    })
)

export const addressValidator = vine.compile(
    vine.object({
        customerAccessToken: vine.string().trim(),
        address: vine.object({
            firstName: vine.string().trim().minLength(2).maxLength(20).regex(nameRegex),
            lastName: vine.string().trim().minLength(2).maxLength(20).regex(nameRegex),
            address1: vine.string().trim().minLength(2).maxLength(50),
            address2: vine.string().trim().minLength(2).maxLength(50).optional(),
            city: vine.string().trim().minLength(2).maxLength(50),
            country: vine.string().trim().minLength(2).maxLength(50),
            province: vine.string().trim().minLength(2).maxLength(50).optional(),
            zip: vine.string().trim().minLength(2).maxLength(50).optional(),
            phone: vine.string().trim().regex(/^[1-9]\d{4,14}$/).optional(),
            prefixCode: vine.string().trim().regex(/^[1-9]\d{0,3}$/).optional(),
            isDefault: vine.boolean().optional(),
        })
    })
)

export const defaultAddressValidtor = vine.compile(
    vine.object({
        customerAccessToken: vine.string().trim(),
        addressId: vine.string().trim(),
    })
)