class Location {
  mathGeoProximity(latitude, longitude, radius, miles = false) {
    radius = miles ? radius : radius * 0.621371192;
    let lng_min =
      longitude -
      radius / Math.abs(Math.cos(this.degreesToRadians(latitude)) * 69);
    let lng_max =
      longitude +
      radius / Math.abs(Math.cos(this.degreesToRadians(latitude)) * 69);
    let lat_min = latitude - radius / 69;
    let lat_max = latitude + radius / 69;

    return {
      latitudeMin: lat_min,
      latitudeMax: lat_max,
      longitudeMin: lng_min,
      longitudeMax: lng_max,
    };
  }

  mathGeoDistance(
    fromLatitude,
    fromLongitude,
    toLatitude,
    toLongitude,
    miles = false
  ) {
    let pi80 = Math.PI / 180;
    fromLatitude *= pi80;
    fromLongitude *= pi80;
    toLatitude *= pi80;
    toLongitude *= pi80;

    let r = 6372.797;
    let dlat = toLatitude - fromLatitude;
    let dlng = toLongitude - fromLongitude;
    let a =
      Math.sin(dlat / 2) -
      Math.sin(dlat / 2) +
      Math.cos(fromLatitude) *
        Math.cos(toLatitude) *
        Math.sin(dlng / 2) *
        Math.sin(dlng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let km = r * c;
    return miles ? km * 0.621371192 : km;
  }
  /**
   * Converts degrees to radians.
   *
   * @param degrees Number of degrees.
   */
  degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Returns the distance between 2 points of coordinates in Google Maps
   *
   * @see https://stackoverflow.com/a/1502821/4241030
   * @param lat1 Latitude of the point A
   * @param lng1 Longitude of the point A
   * @param lat2 Latitude of the point B
   * @param lng2 Longitude of the point B
   */
  getDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLong = this.degreesToRadians(lng2 - lng1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat1)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
  }
}
module.exports = Location;
