'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryServiceSchema extends Schema {
  up () {
    this.rename('category_services', 'category_service')
  }

  down () {
    this.table('category_services', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CategoryServiceSchema
