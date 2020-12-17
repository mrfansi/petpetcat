"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.resource("shops", "ShopController").apiOnly();
Route.resource("shops.schedules", "ShopScheduleController").only(['index', 'store', 'destroy']);
Route.resource("categories", "CategoryController").apiOnly();
Route.resource("categories.services", "CategoryServiceController").apiOnly();
Route.resource("services", "ServiceController").apiOnly();
Route.resource("services.shops", "ServiceShopController").apiOnly();
Route.resource("orders", "OrderController").apiOnly();
Route.post("booking", "BookingController.makeBooking");
Route.get("booking/:id", "BookingController.getBooking");
