"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServicesSchema extends Schema {
  up() {
    this.table("services", (table) => {
      // alter table
      table.dropColumn("service_price");
    });
  }

  down() {
    this.table("services", (table) => {
      // reverse alternations
    });
  }
}

module.exports = ServicesSchema;
