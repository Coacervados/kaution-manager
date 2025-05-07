/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export const CreateInventoryValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        description: vine.string().optional(), 
        userId: vine.number(),
    })
)

export const UpdateInventoryValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        description: vine.string().optional(),
    })
)