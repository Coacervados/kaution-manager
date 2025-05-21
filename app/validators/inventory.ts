import vine from '@vinejs/vine'

export const InventoryValidator  = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().optional(),
  })
)

export const InventoryUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(50),
  })
)
