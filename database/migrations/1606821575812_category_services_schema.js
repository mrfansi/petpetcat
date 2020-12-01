"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoryServicesSchema extends Schema {
  up() {
    this.table("category_services", (table) => {
      // alter table
      table.uuid("service_id").unique().references("id").inTable("services").alter();
    });
  }

  down() {
    this.table("category_services", (table) => {
      // reverse alternations
    });
  }
}

module.exports = CategoryServicesSchema;
