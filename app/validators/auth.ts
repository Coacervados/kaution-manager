/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

const emailRule = () => vine.string().maxLength(254).email().normalizeEmail() // Fixed typo

export const registerUserValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    email: emailRule().unique({
      table: 'users',
      column: 'email',
      caseInsensitive: true,
    }),
    password: vine.string().minLength(6),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: emailRule(),
    password: vine.string().minLength(6),
  })
)

