"use strict";
const Shop = use("App/Models/Shop");
const Location = use("App/Libraries/Location");

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
        const latitude = parseFloat(payload.latitude);
        const longitude = parseFloat(payload.longitude);
        const radius = parseInt(payload.radius) || 10;
        const q = payload.q;
        const location = new Location();
        const proximity = location.mathGeoProximity(latitude, longitude, radius);
        if (!latitude)
            return response.status(400).json({ message: "Must have latitude" });

        if (!longitude)
            return response.status(400).json({ message: "Must have longitude" });
        const shops = await Shop.query()
            .whereBetween("shop_latitude", [
                proximity["latitudeMin"],
                proximity["latitudeMax"],
            ])
            .whereBetween("shop_longitude", [
                proximity["longitudeMin"],
                proximity["longitudeMax"],
            ])
            .where('shop_name', 'like', '%' + q + '%')
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
        return response.status(200).json(members);
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
