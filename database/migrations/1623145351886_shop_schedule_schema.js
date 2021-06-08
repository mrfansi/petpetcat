'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShopScheduleSchema extends Schema {
  up () {
    this.create('shop_schedules', (table) => {
      table.uuid('id').primary()
      table.uuid('shop_id').notNullable()
        .references('id').inTable('shops')
      table.integer('meet_on')
      table.string('meet_on_desc')
      table.boolean('meet_status')
      table.json('meet_schedules')
      table.timestamps()
    })
  }

  down () {
    this.drop('shop_schedules')
  }
}

module.exports = ShopScheduleSchema
