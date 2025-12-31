import vine from "@vinejs/vine"

export const cartValidator = vine.compile(
    vine.object({
        cartId: vine.string().trim().regex(/^gid:\/\/shopify\/Cart\//).optional(),
        merchandiseId: vine.string().trim().regex(/^gid:\/\/shopify\/ProductVariant\//),
        quantity: vine.number().min(1).max(20),
    })
)

export const cartUpdateValidator = vine.compile(
    vine.object({
        cartId: vine.string().trim().regex(/^gid:\/\/shopify\/Cart\//),
        lineId: vine.string().trim().regex(/^gid:\/\/shopify\/CartLine\//),
        quantity: vine.number().min(1).max(20),
    })
)

export const cartRemoveValidator = vine.compile(
    vine.object({
        cartId: vine.string().trim().regex(/^gid:\/\/shopify\/Cart\//),
        lineId: vine.string().trim().regex(/^gid:\/\/shopify\/CartLine\//),
    })
)

export const cartIdValidator = vine.compile(
    vine.object({
        cartId: vine.string().trim().regex(/^gid:\/\/shopify\/Cart\//),
    })
)

export const cartDiscountCodesUpdateValidator = vine.compile(
    vine.object({
        cartId: vine.string().trim().regex(/^gid:\/\/shopify\/Cart\//),
        discountCodes: vine.array(vine.string().trim()).minLength(1).maxLength(1),
    })
)