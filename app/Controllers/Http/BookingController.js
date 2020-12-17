'use strict'
const Booking = use('App/Models/Booking');
const ServiceShop = use('App/Models/ServiceShop');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bookings
 */
class BookingController {
    async generateBooking() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        const uniqueId = function() {
            let text = ''
            for (let i = 0; i < 8; i++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length))
            }
            return text
        }
        return uniqueId()
    }
    async makeBooking({ request, response }) {
        try {
            const payload = request.all();
            const booking_schedule = payload.booking_schedule;
            const shop_id = payload.shop_id;
            const service_id = payload.service_id;
            const service_shop = await ServiceShop.query()
                .where('shop_id', shop_id)
                .where('service_id', service_id)
                .first();
            const booking = new Booking();
            booking.booking_id = await this.generateBooking();
            booking.booking_schedule = JSON.stringify(booking_schedule);
            booking.booking_status = 0;
            booking.booking_price = service_shop.service_price;
            booking.booking_at = new Date();
            booking.service_id = service_id;
            booking.shop_id = shop_id;

            await booking.save();

            return response.status(200).json(booking)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    makePayment({ request, response }) {
        const payload = request.all();
    }

    getBooking({ params, request, response }) {

    }
}

module.exports = BookingController
