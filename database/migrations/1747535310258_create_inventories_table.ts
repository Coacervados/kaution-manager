import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventories'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('name').notNullable()
      table.text('description')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}