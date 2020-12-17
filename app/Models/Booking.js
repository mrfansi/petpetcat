'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Booking extends Model {
    static boot() {
        super.boot();
        this.addHook("beforeCreate", "UuidHook.uuidv4");
        // this.addHook("beforeCreate", "BookId.generate");
    }

    static get table() {
        return "booking";
    }

    static get incrementing() {
        return false;
    }
}

module.exports = Booking
