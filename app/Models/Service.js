"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Service extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "UuidHook.uuidv4");

    this.addTrait("@provider:Lucid/Slugify", {
      fields: { service_slug: "service_name" },
      strategy: async (fields, value, modelInstance) => {
        return `${value}-${modelInstance.id.slice(-5)}`;
      },
    });
  }

  static get incrementing() {
    return false;
  }



  shops() {
    return this.belongsToMany("App/Models/Shop");
  }
}

module.exports = Service;
