import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('name').nullable()
      table.string('description').nullable()
      table.integer('inventoryId').unsigned().references('id').inTable('inventories')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
