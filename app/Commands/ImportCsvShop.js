'use strict'
const fs = require('fs')
const Database = use('Database')
const Shop = use('App/Models/Shop')
const neatCsv = require('neat-csv');
const {Command} = require('@adonisjs/ace')

class ImportCsvShop extends Command {
  static get signature() {
    return 'import:csv:shop'
  }

  static get description() {
    return 'Tell something helpful about this command'
  }

  async handle(args, options) {
    fs.readFile('./app/Commands/data.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const shops = await neatCsv(data)
      await Shop.createMany(shops)
    })
    Database.close();
  }
}

module.exports = ImportCsvShop
