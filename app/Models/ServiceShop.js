"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ServiceShop extends Model {
  static get table() {
    return "service_shop";
  }

  shop() {
    return this.belongsTo("App/Models/Shop");
  }

  service() {
    return this.belongsTo("App/Models/Service");
  }
}

module.exports = ServiceShop;
