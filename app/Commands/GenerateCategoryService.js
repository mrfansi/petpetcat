'use strict'
const Category = use('App/Models/Category')
const Service = use('App/Models/Service')
const CategoryService = use('App/Models/CategoryService')
const { Command } = require('@adonisjs/ace')
const Database = use('Database')


class GenerateCategoryService extends Command {
    static get signature() {
        return 'generate:category_service'
    }

    static get description() {
        return 'Tell something helpful about this command'
    }

    async handle(args, options) {
        const categories = await Category.all();
        const services = await Service.all();
        Database.close()
        for (const category of categories.toJSON()) {
            for (const service of services.toJSON()) {
                try {
                  const categoryService = new CategoryService();
                  categoryService.category_id = category.id;
                  categoryService.service_id = service.id;

                  await categoryService.save();
                  Database.close();
                } catch (e) {
                  console.log(e)
                }

            }
        }

    }
}

module.exports = GenerateCategoryService
