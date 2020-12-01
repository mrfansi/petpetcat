"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Location = use("App/Libraries/Location");
class Shop extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "UuidHook.uuidv4");
    this.addTrait("Location");
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

  static get computed() {
    return [
      "shop_distance_in_km",
      "shop_distance_in_meter",
    ];
  }

  setCurrentLatitude(current_latitude) {
    return this.current_latitude = current_latitude;
  }

  setCurrentLongitude(current_longitude) {
    return this.current_longitude = current_longitude;
  }

  getShopDistanceInKm() {
    console.log(this.current_latitude);
    const location = new Location();
    return location.getDistanceBetweenPoints(
      this.shop_latitude,
      this.shop_longitude,
      this.current_latitude,
      this.current_longitude
    );
  }
}

module.exports = Shop;
