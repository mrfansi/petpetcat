"use strict";
const Service = use("App/Models/Service");
const CategoryService = use("App/Models/CategoryService");
const Category = use("App/Models/Category");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with service_shop
 */
class CategoryServiceController {
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
    try {
      // const payload = request.all();
      // const page = parseInt(payload.page) || 1;
      // const limit = parseInt(payload.limit) || 5;
      // const members = await Category.query()
      //   .where("id", params.categories_id)
      //   .orWhere("category_slug", params.categories_id)
      //   .with("services", (builder) => {
      //     builder.forPage(page, limit);
      //   })
      //   .first();
      //
      // return response.status(200).json(members);
    } catch (e) {
      return response.status(500).json({
        error: e,
        message: "Internal server error"
      })
    }
  }

  /**
   * Create/save a new CategoryService.
   * POST service_shop
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    try {
      const payload = request.all();
      const category = await Category.query()
        .where("id", params.categories_id)
        .orWhere("category_slug", params.categories_id)
        .first();

      if (!category) {
        return response.status(404).json({
          message: "Category not found",
        });
      }

      const service = await Service.query()
        .where("id", payload.service_id)
        .orWhere("service_slug", payload.service_id)
        .first();

      if (!service) {
        return response.status(404).json({
          message: "Service not found",
        });
      }

      if (!service && !category) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = new CategoryService();
      member.service_id = service?.id;
      member.category_id = category?.id;
      await member.save();

      return response.status(200).json({
        message: "Data successfully created",
      });
    } catch (error) {
      console.log(error);
      if (error.code == "ER_DUP_ENTRY") {
        return response.status(500).json({
          message: "Data duplicated",
        });
      }
      return response.status(500).json({
        error: error,
        message: "Internal server error",
      });
    }
  }

  /**
   * Display a single CategoryService.
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
        .where("id", params.id)
        .orWhere("service_slug", params.id)
        .first();
      const category = await Category.query()
        .where("id", params.categories_id)
        .orWhere("category_slug", params.categories_id)
        .first();

      if (!service && !category) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await CategoryService.query()
        .where("service_id", service.id)
        .where("category_id", category.id)
        .with("category")
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
   * Update CategoryService details.
   * PUT or PATCH service_shop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const service = await Service.query()
        .where("id", params.id)
        .orWhere("service_slug", params.id)
        .first();
      const category = await Category.query()
        .where("id", params.categories_id)
        .orWhere("category_slug", params.categories_id)
        .first();

      if (!service && !category) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await CategoryService.query()
        .where("service_id", service.id)
        .where("category_id", category.id)
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
   * Delete a CategoryService with id.
   * DELETE service_shop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const category = await Category.query()
        .where("id", params.categories_id)
        .orWhere("category_slug", params.categories_id)
        .first();

      const service = await Service.query()
        .where("id", params.id)
        .orWhere("service_slug", params.id)
        .first();

      if (!service && !category) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const member = await CategoryService.query()
        .where("service_id", service.id)
        .where("category_id", category.id)
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

module.exports = CategoryServiceController;
