import vine from "@vinejs/vine";

export const contactValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(2).maxLength(50).regex(/^[\p{L}\p{M}'\-\s]+$/u),
        email: vine.string().trim().email(),
        phone: vine.string().trim().regex(/^\+?[\d\s\(\)\-]{7,20}$/),
        reason: vine.string().trim().minLength(3).maxLength(20).in(['sales', 'support', 'warranty', 'selling', 'other']),
        message: vine.string().trim().minLength(10).maxLength(1000),
    })
)

export const sellToUsValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(2).maxLength(50).regex(/^[\p{L}\p{M}'\-\s]+$/u),
        company: vine.string().trim().minLength(2).maxLength(100).optional(),
        email: vine.string().trim().email(),
        phone: vine.string().trim().regex(/^\+?[\d\s\(\)\-]{7,20}$/),
        productList: vine.string().trim().minLength(10).maxLength(500).optional(),
        notes: vine.string().trim().minLength(10).maxLength(2000).optional(),
        images: vine.array(vine.file({
            size: '5mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp']
        })).maxLength(5).optional(),
    })
)

export const warrantyValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(2).maxLength(50).regex(/^[\p{L}\p{M}'\-\s]+$/u),
        company: vine.string().trim().minLength(2).maxLength(100).optional(),
        email: vine.string().trim().email(),
        phone: vine.string().trim().regex(/^\+?[\d\s\(\)\-]{7,20}$/),
        serialNumber: vine.string().trim().minLength(5).maxLength(100),
        sku: vine.string().trim().minLength(5).maxLength(100).optional(),
        issueDescription: vine.string().trim().minLength(10).maxLength(2000),
        images: vine.array(vine.file({
            size: '5mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp']
        })).maxLength(5).optional(),
    })
)