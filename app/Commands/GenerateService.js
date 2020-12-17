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
        await shops.toJSON().forEach(async(shop) => {
            await services.toJSON().forEach(async(service) => {
                const price = Math.floor(Math.random() * (999 - 100 + 1) + 100) + '000';
                const addToShop = new ServiceShop();
                addToShop.shop_id = shop.id;
                addToShop.service_id = service.id;
                addToShop.service_price = price;

                await addToShop.save();
                Database.close();

            });
        });

    }
}

module.exports = GenerateService
