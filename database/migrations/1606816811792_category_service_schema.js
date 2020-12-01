'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryServiceSchema extends Schema {
  up () {
    this.create('category_services', (table) => {
      table.increments().primary();
      table.uuid("category_id").references("id").inTable("categories");
      table.uuid("service_id").references("id").inTable("services");
      table.timestamps();
    })
  }

  down () {
    this.drop('category_services')
  }
}

module.exports = CategoryServiceSchema
