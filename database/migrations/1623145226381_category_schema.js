'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.uuid('id').primary()
      table.string('category_name').notNullable()
      table.string('category_slug').notNullable().unique()
      table.text('category_description')
      table.string('category_image')
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
