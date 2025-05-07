import vine from '@vinejs/vine'

export const emailRoule = () => vine.string().maxLength(254).email().normalizeEmail()

export const registerUserSchema = vine.object({
    name: vine.string().optional(),
    email: emailRoule().unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true
    }),
    password: vine.string().minLength(6)
})

export const registerUserValidator = vine.compile(registerUserSchema);