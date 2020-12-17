'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bookings
 */
class BookingController {
    makeBooking({ request, response }) {
        const payload = request.all();

    }

    makePayment({ request, response }) {
        const payload = request.all();
    }

    getBooking({ params, request, response }) {

    }
}

module.exports = BookingController
