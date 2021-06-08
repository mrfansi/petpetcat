'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.uuid('id').primary()
      table.uuid('shop_id').notNullable().references('id').inTable('shops')
      table.uuid('service_id').notNullable().references('id').inTable('services')
      table.string('booking_id').notNullable()
      table.json('booking_schedule')
      table.boolean('booking_status')
      table.decimal('booking_price', 8, 2)
      table.string('booking_email')
      table.datetime('booking_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
