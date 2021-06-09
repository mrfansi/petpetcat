'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShopSchema extends Schema {
  up () {
    this.create('shops', (table) => {
      table.uuid('id').primary()
      table.string('shop_name').notNullable()
      table.string('shop_slug').notNullable().unique()
      table.text('shop_description')
      table.text('shop_address')
      table.string('shop_image')
      table.string('shop_phone')
      table.decimal('shop_latitude', 11, 8)
      table.decimal('shop_longitude', 11, 8)
      table.boolean('shop_shopping')
      table.boolean('shop_pickup')
      table.timestamps()
    })
  }

  down () {
    this.drop('shops')
  }
}

module.exports = ShopSchema
