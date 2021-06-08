'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryServiceSchema extends Schema {
  up () {
    this.create('category_service', (table) => {
      table.increments()
      table.uuid('category_id').notNullable()
        .references('id').inTable('categories')
      table.uuid('service_id').notNullable()
        .references('id').inTable('services')
      table.timestamps()
    })
  }

  down () {
    this.drop('category_service')
  }
}

module.exports = CategoryServiceSchema
