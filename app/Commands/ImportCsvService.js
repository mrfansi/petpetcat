'use strict'
const fs = require('fs')
const Database = use('Database')
const Service = use('App/Models/Service')
const neatCsv = require('neat-csv');
const {Command} = require('@adonisjs/ace')

class ImportCsvService extends Command {
  static get signature() {
    return 'import:csv:service'
  }

  static get description() {
    return 'Tell something helpful about this command'
  }

  async handle(args, options) {
    fs.readFile('./app/Commands/services.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const services = await neatCsv(data)
      await Service.createMany(services)
    })
    Database.close();
  }
}

module.exports = ImportCsvService
