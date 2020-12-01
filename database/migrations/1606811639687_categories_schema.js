"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoriesSchema extends Schema {
  up() {
    this.table("categories", (table) => {
      // alter table
      table.uuid("id").primary().alter();
    });
  }

  down() {
    this.table("categories", (table) => {
      // reverse alternations
    });
  }
}

module.exports = CategoriesSchema;
