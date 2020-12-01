"use strict";
const Shop = use("App/Models/Shop");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with shops
 */
class ShopController {
  /**
   * Show a list of all shops.
   * GET shops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const payload = request.all();
    const page = parseInt(payload.page) || 1;
    const limit = parseInt(payload.limit) || 5;
    const members = await Shop.query().paginate(page, limit);
    return response.status(200).json(members.toJSON());
  }

  /**
   * Create/save a new shop.
   * POST shops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const member = new Shop();
      const payload = request.all();
      member.shop_name = payload.shop_name;
      member.shop_description = payload.shop_description;
      member.shop_image = payload.shop_image;
      member.shop_address = payload.shop_address;
      member.shop_phone = payload.shop_phone;
      member.shop_latitude = payload.shop_latitude;
      member.shop_longitude = payload.shop_longitude;
      member.shop_shopping = payload.shop_shopping;
      member.shop_pickup = payload.shop_pickup;
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
   * Display a single shop.
   * GET shops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const member = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
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
   * Update shop details.
   * PUT or PATCH shops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const member = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
        .first();

      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const payload = request.all();
      member.shop_name = payload.shop_name;
      member.shop_description = payload.shop_description;
      member.shop_image = payload.shop_image;
      member.shop_address = payload.shop_address;
      member.shop_phone = payload.shop_phone;
      member.shop_latitude = payload.shop_latitude;
      member.shop_longitude = payload.shop_longitude;
      member.shop_shopping = payload.shop_shopping;
      member.shop_pickup = payload.shop_pickup;
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
   * Delete a shop with id.
   * DELETE shops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const member = await Shop.query()
        .where("id", params.id)
        .orWhere("shop_slug", params.id)
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

module.exports = ShopController;
