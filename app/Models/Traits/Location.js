class Location {
  register(Model, options) {
    Model.queryMacro("inLatitude", function (value) {
      this.setCurrentLatitude(value);

      return this;
    });

    Model.queryMacro("inLongitude", function (value) {
      this.setCurrentLongitude(value);
      return this;
    });
  }
}

module.exports = Location;
