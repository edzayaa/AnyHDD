import vine from '@vinejs/vine'

export const productIdValidator = vine.compile(
    vine.object({
        productId: vine.string().trim().minLength(5).maxLength(255),
        page: vine.number().min(1).max(100).optional(),
    })
)

export const reviewValidator = vine.compile(
    vine.object({
        productId: vine.string().trim().minLength(5).maxLength(255),
        email: vine.string().trim().email().optional(),
        name: vine.string().trim().minLength(2).maxLength(50).optional(),
        rating: vine.number().transform((value) => {
            const rounded = Math.round(value)
            if (rounded < 1) return 1
            if (rounded > 5) return 5
            return rounded
        }),
        content: vine.string().trim().minLength(3).maxLength(500),
    })
)