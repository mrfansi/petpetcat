"use strict";
const Service = use("App/Models/Service");
const ServiceShop = use("App/Models/ServiceShop");
const Shop = use("App/Models/Shop");
const Location = use("App/Libraries/Location");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with service_shop
 */
class ServiceShopController {
  /**
   * Show a list of all service_shop.
   * GET service_shop
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response }) {
    const payload = request.all();
    const latitude = parseFloat(payload.latitude);
    const longitude = parseFloat(payload.longitude);
    const radius = parseInt(payload.radius) || 10;
    const location = new Location();
    const proximity = location.mathGeoProximity(latitude, longitude, radius);
    if (!latitude)
      return response.status(400).json({ message: "Must have latitude" });

    if (!longitude)
      return response.status(400).json({ message: "Must have longitude" });
    const service = await Service.query()
      .where("id", params.services_id)
      .orWhere("service_slug", params.services_id)
      .first();
    const shops = await Shop.query()
      .whereBetween("shop_latitude", [
        proximity["latitudeMin"],
        proximity["latitudeMax"],
      ])
      .whereBetween("shop_longitude", [
        proximity["longitudeMin"],
        proximity["longitudeMax"],
      ])
      .whereHas("service_shop", (builder) =>
        builder.where("service_id", service.id)
      )
      .fetch();
    const members = [];
    shops.toJSON().forEach((shop) => {
      const distance = location.mathGeoDistance(
        latitude,
        longitude,
        shop.shop_latitude,
        shop.shop_longitude
      );
      shop.shop_in_km = distance;
      if (distance <= radius) members.push(shop);
    });
    service.shops = members;
    return response.status(200).json(service);
  }

  /**
   * Create/save a new ServiceShop.
   * POST service_shop
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    try {
      const payload = request.all();
      const service = await Service.query()
        .where("id", params.services_id)
        .orWhere("service_slug", params.services_id)
        .first();
      const shop = await Shop.query()
        .where("id", payload.shop_id)
        .orWhere("shop_slug", payload.shop_id)
        .first();

      if (!service && !shop) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = new ServiceShop();
      member.service_price = payload.service_price;
      member.service_id = service.id;
      member.shop_id = shop.id;
      await member.save();

      return response.status(200).json({
        message: "Data successfully created",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Display a single ServiceShop.
   * GET service_shop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const service = await Service.query()
        .where("id", params.services_id)
        .orWhere("service_slug", params.services_id)
        .first();
      const shop = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
        .first();

      if (!service && !shop) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await ServiceShop.query()
        .where("service_id", service.id)
        .where("shop_id", shop.id)
        .with("shop")
        .with("service")
        .first();
      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }
      return response.status(200).json(member.toJSON());
    } catch (e) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Update ServiceShop details.
   * PUT or PATCH service_shop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const service = await Service.query()
        .where("id", params.services_id)
        .orWhere("service_slug", params.services_id)
        .first();
      const shop = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
        .first();

      if (!service && !shop) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await ServiceShop.query()
        .where("service_id", service.id)
        .where("shop_id", shop.id)
        .first();

      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const payload = request.all();
      member.service_price = payload.service_price;
      member.save();

      return response.status(200).json({
        message: "Data successfully updated",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }

  /**
   * Delete a ServiceShop with id.
   * DELETE service_shop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const service = await Service.query()
        .where("id", params.services_id)
        .orWhere("service_slug", params.services_id)
        .first();
      const shop = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
        .first();

      if (!service && !shop) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await ServiceShop.query()
        .where("service_id", service.id)
        .where("shop_id", shop.id)
        .first();
      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }
      await member.delete();
      return response.status(200).json({
        message: "Data successfully deleted",
      });
    } catch (e) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = ServiceShopController;
