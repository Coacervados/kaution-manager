/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export const emailRule = () => vine.string().maxLength(254).email().normalizeEmail() // Fixed typo

export const registerUserSchema = vine.object({
    name: vine.string().optional(),
    email: emailRule().unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true
    }),
    password: vine.string().minLength(6)
})

export const registerUserValidator = vine.compile(registerUserSchema);