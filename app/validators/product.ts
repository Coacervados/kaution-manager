import vine from '@vinejs/vine'

export const ProductValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().optional(),
    quantity: vine.number(),
    SEDUCcode: vine.number().optional(),
  })
)

export const ProductUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(50),
    quantity: vine.number(),
    SEDUCcode: vine.number().optional(),
  })
)
