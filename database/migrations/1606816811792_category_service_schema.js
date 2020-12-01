'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryServiceSchema extends Schema {
  up () {
    this.create('category_services', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('category_services')
  }
}

module.exports = CategoryServiceSchema
