"use strict";
const Category = use("App/Models/Category");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
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
    const members = await Category.query().paginate(page, limit);
    return response.status(200).json(members.toJSON());
  }

  /**
   * Create/save a new Category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const member = new Category();
      const payload = request.all();
      member.category_name = payload.category_name;
      member.category_description = payload.category_description;
      member.category_image = payload.category_image;
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
   * Display a single Category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const member = await Category.query()
        .where("id", params.id)
        .orWhere("category_slug", params.id)
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
   * Update Category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const member = await Category.query()
        .where("id", params.id)
        .orWhere("category_slug", params.id)
        .first();

      if (!member) {
        return response.status(404).json({
          message: "Data not found",
        });
      }

      const payload = request.all();
      member.category_name = payload.category_name;
      member.category_description = payload.category_description;
      member.category_image = payload.category_image;
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
   * Delete a Category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const member = await Category.query()
        .where("id", params.id)
        .orWhere("category_slug", params.id)
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

module.exports = CategoryController;
