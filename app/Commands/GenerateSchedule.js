'use strict'
const Shop = use('App/Models/Shop');
const ShopSchedule = use("App/Models/ShopSchedule");
const Database = use("Database");

const { Command } = require('@adonisjs/ace')

class GenerateSchedule extends Command {
    static get signature() {
        return 'generate:schedule'
    }

    static get description() {
        return 'Tell something helpful about this command'
    }

    async handle(args, options) {
        try {
            const shops = await Shop.all();
            const schedules = {
                "sunday": {
                    "value": 7,
                    "schedule": [],
                    "status": false
                },
                "monday": {
                    "value": 1,
                    "schedule": [{
                            "time": "09:00",
                            "qty": 10
                        },
                        {
                            "time": "13:00",
                            "qty": 10
                        },
                        {
                            "time": "15:00",
                            "qty": 10
                        }
                    ],
                    "status": true
                },
                "tuesday": {
                    "value": 2,
                    "schedule": [{
                            "time": "09:00",
                            "qty": 10
                        },
                        {
                            "time": "13:00",
                            "qty": 10
                        },
                        {
                            "time": "15:00",
                            "qty": 10
                        }
                    ],
                    "status": true
                },
                "wednesday": {
                    "value": 3,
                    "schedule": [{
                            "time": "09:00",
                            "qty": 10
                        },
                        {
                            "time": "13:00",
                            "qty": 10
                        },
                        {
                            "time": "15:00",
                            "qty": 10
                        }
                    ],
                    "status": true
                },
                "thursday": {
                    "value": 4,
                    "schedule": [{
                            "time": "09:00",
                            "qty": 10
                        },
                        {
                            "time": "13:00",
                            "qty": 10
                        },
                        {
                            "time": "15:00",
                            "qty": 10
                        }
                    ],
                    "status": true
                },
                "friday": {
                    "value": 5,
                    "schedule": [{
                            "time": "09:00",
                            "qty": 10
                        },
                        {
                            "time": "13:00",
                            "qty": 10
                        },
                        {
                            "time": "15:00",
                            "qty": 10
                        }
                    ],
                    "status": true
                },
                "saturday": {
                    "value": 6,
                    "schedule": [],
                    "status": false
                }
            }
            for await (const [sk, sv] of Object.entries(shops.toJSON())) {
                try {
                    for await (const [k, v] of Object.entries(schedules)) {
                        await ShopSchedule.updateOrCreate({
                            shop_id: sv.id,
                            meet_on: v.value
                        }, {
                            meet_on_desc: k,
                            meet_status: v.status,
                            meet_schedules: JSON.stringify(v.schedule)
                        });
                    }
                    this.success(sv.id + ' -> generate success')

                } catch (error) {
                    this.error(sv.id + ' -> ' + error.message)
                }
                Database.close()

            };

            Database.close()

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = GenerateSchedule
