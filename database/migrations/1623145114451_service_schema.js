'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.uuid('id').primary()
      table.string('service_name').notNullable()
      table.string('service_slug').notNullable().unique()
      table.text('service_description')
      table.string('service_image')
      table.decimal('service_price', 8, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
