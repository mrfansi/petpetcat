'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ShopSchedule extends Model {
  static boot() {
    super.boot();
    this.addTrait("@provider:Lucid/UpdateOrCreate")
    this.addHook("beforeCreate", "UuidHook.uuidv4");
  }
  static get table() {
    return 'shop_schedule'
  }

  shop() {
    return this.belongsTo("App/Models/Shop");
  }
}

module.exports = ShopSchedule
