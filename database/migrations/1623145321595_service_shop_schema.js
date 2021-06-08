'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceShopSchema extends Schema {
  up() {
    this.create('service_shops', (table) => {
      table.increments()
      table.decimal('service_price', 8, 2).notNullable()
      table.uuid('service_id').notNullable()
        .references('id').inTable('services')
      table.uuid('shop_id').notNullable()
        .references('id').inTable('shops')
      table.timestamps()

    })
  }

  down() {
    this.drop('service_shops')
  }
}

module.exports = ServiceShopSchema
