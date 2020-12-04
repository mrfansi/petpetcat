"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
class Shop extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "UuidHook.uuidv4");
    this.addTrait("@provider:Lucid/Slugify", {
      fields: { shop_slug: "shop_name" },
      strategy: async (fields, value, modelInstance) => {
        return `${value}-${modelInstance.id.slice(-5)}`;
      },
    });
  }

  static get incrementing() {
    return false;
  }

  service_shop() {
    return this.hasMany("App/Models/ServiceShop");
  }

  schedules() {
    return this.hasMany("App/Models/ShopSchedule")
  }
}

module.exports = Shop;
