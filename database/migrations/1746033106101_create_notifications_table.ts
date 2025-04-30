import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('message').notNullable()
      table.boolean('viewed').defaultTo(false).nullable()

      table.timestamp('send_at').notNullable()
      table.timestamp('viwed_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
