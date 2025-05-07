import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare message: string

  @column.dateTime({ autoCreate: true })
  declare sendAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare viewedAt: DateTime

  @column({ serializeAs: null })
  declare viewed: boolean
}
