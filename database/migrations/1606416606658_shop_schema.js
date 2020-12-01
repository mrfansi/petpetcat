"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ShopSchema extends Schema {
  up() {
    this.create("shops", (table) => {
      table.uuid("id").primary();
      table.string("shop_slug");
      table.string("shop_name");
      table.string("shop_description");
      table.string("shop_image");
      table.string("shop_address");
      table.string("shop_phone");
      table.decimal("shop_latitude", 15, 14);
      table.decimal("shop_longitude", 17, 14);
      table.boolean("shop_shopping");
      table.boolean("shop_pickup");
      table.timestamps();
    });
  }

  down() {
    this.drop("shops");
  }
}

module.exports = ShopSchema;
