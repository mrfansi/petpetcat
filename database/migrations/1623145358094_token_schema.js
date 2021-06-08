'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokenSchema
