import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().optional(),
    inventoryId: vine.number(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().optional(),
    inventoryId: vine.number(),
  })
)
