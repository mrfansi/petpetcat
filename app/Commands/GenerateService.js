'use strict'
const Shop = use('App/Models/Shop')
const Service = use('App/Models/Service')
const ServiceShop = use('App/Models/ServiceShop')
const { Command } = require('@adonisjs/ace')
const Database = use('Database')


class GenerateService extends Command {
    static get signature() {
        return 'generate:service'
    }

    static get description() {
        return 'Tell something helpful about this command'
    }

    async handle(args, options) {
        const shops = await Shop.all();
        const services = await Service.all();
        Database.close()
        for (const shop of shops.toJSON()) {
            for (const service of services.toJSON()) {
                try {
                  const search = await ServiceShop.query()
                    .where('shop_id', shop.id)
                    .where('service_id', service.id)
                    .first()

                  if (search) {
                    this.info(`${service.service_name} and ${shop.shop_name} was integrated!`)
                    return;
                  }

                  const addToShop = new ServiceShop();
                  addToShop.shop_id = shop.id;
                  addToShop.service_id = service.id;
                  addToShop.service_price = service.service_price;

                  await addToShop.save();
                  this.success(`${service.service_name} and ${shop.shop_name} connected!`)

                  Database.close();
                } catch (e) {
                  console.log(e)
                }

            }
        }

    }
}

module.exports = GenerateService
