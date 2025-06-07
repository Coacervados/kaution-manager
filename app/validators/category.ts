import vine from '@vinejs/vine'

export const CategoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(50).optional(),
    inventoryId: vine.number(),
  })
)

export const CategoryUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(50),
  })
)
