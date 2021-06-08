"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CategoryService extends Model {
  static get table() {
    return 'category_service'
  }

  category() {
    return this.belongsTo("App/Models/Category");
  }

  service() {
    return this.belongsTo("App/Models/Service");
  }
}

module.exports = CategoryService;
