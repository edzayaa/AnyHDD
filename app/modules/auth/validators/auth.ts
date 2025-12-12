import vine from "@vinejs/vine";

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email(),
        password: vine.string().minLength(6),
    })
)
  
export const registerValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim().minLength(2).maxLength(50).toLowerCase(),
        lastName: vine.string().trim().minLength(2).maxLength(50).toLowerCase(),
        email: vine.string().trim().email(),
        password: vine.string().minLength(6),
    })
)

export const forgotPasswordValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email(),
    })
)

export const resetPasswordValidator = vine.compile(
    vine.object({
        customerId: vine.string().trim(),
        resetToken: vine.string().trim(),
        password: vine.string().minLength(6),
        confirmPassword: vine.string().minLength(6).sameAs('password'),
    })
)

export const resetPasswordParamsValidator = vine.compile(
    vine.object({
        customerId: vine.string().trim().minLength(5),
        resetToken: vine.string().trim().minLength(5),
    })
)

export const activateAccountValidator = vine.compile(
    vine.object({
        customerId: vine.string().trim().minLength(5),
        activateToken: vine.string().trim().minLength(5),
        password: vine.string().trim().minLength(6),
        confirmPassword: vine.string().trim().minLength(6).sameAs('password'),
    })
)

export const activateAccountParamsValidator = vine.compile(
    vine.object({
        customerId: vine.string().trim().minLength(5),
        activateToken: vine.string().trim().minLength(5),
    })
)