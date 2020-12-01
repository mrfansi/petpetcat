"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceSchema extends Schema {
  up() {
    this.create("services", (table) => {
      table.uuid("id").primary();
      table.string("service_slug");
      table.string("service_name");
      table.string("service_description");
      table.string("service_image");
      table.float("service_price");
      table.timestamps();
    });
  }

  down() {
    this.drop("services");
  }
}

module.exports = ServiceSchema;
