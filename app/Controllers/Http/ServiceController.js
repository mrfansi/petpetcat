"use strict";
const Service = use("App/Models/Service");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
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
    const members = await Service.query().paginate(page, limit);
    return response.status(200).json(members.toJSON());
  }

  /**
   * Create/save a new Service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const member = new Service();
      const payload = request.all();
      member.service_name = payload.service_name;
      member.service_description = payload.service_description;
      member.service_price = payload.service_price;
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
   * Display a single Service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const member = await Service.query()
        .where("id", params.id)
        .orWhere("service_slug", params.id)
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
   * Update Service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const member = await Service.query()
        .where("id", params.id)
        .orWhere("service_slug", params.id)
        .first();

      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const payload = request.all();
      member.service_name = payload.service_name;
      member.service_description = payload.service_description;
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
   * Delete a Service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const member = await Service.query()
        .where("id", params.id)
        .orWhere("service_slug", params.id)
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

module.exports = ServiceController;
