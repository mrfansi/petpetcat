"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceShopsSchema extends Schema {
  up() {
    this.create("service_shops", (table) => {
      table.increments().primary();
      table.uuid("service_id").references("id").inTable("services");
      table.uuid("shop_id").references("id").inTable("shops");
      table.float("service_price");
      table.timestamps();
    });
  }

  down() {
    this.drop("service_shops");
  }
}

module.exports = ServiceShopsSchema;
