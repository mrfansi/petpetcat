"use strict";

const LocationHook = (exports = module.exports = {});
LocationHook.method = async (modelInstance) => {
  modelInstance.shop_distance_in_km = 0;
};
