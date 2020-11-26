"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ShopSchema extends Schema {
  up() {
    this.create("shops", (table) => {
      table.uuid("id");
      table.string("shop_slug");
      table.string("shop_name");
      table.string("shop_description");
      table.string("shop_image");
      table.string("shop_address");
      table.string("shop_phone");
      table.string("shop_latitude");
      table.string("shop_longitude");
      table.string("shop_shopping");
      table.string("shop_pickup");
      table.timestamps();
    });
  }

  down() {
    this.drop("shops");
  }
}

module.exports = ShopSchema;
