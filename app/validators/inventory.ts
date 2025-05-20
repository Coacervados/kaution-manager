import vine from '@vinejs/vine'

export const inventoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().optional(),
  })
)
