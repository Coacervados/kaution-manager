import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('inventory_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('inventories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name').notNullable()
      table.string('description').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
