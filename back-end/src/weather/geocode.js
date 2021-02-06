const request = require("request-promise");

const geocodeFunction = async (place) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1Ijoic3Ryb25nYXJtIiwiYSI6ImNrazJ4NXh3YzA3czUydXBjZGJmbHl5c24ifQ.ABGBESgYPK-2Y2RxmyKyxg`;
  const information = await request({ url: url, json: true });
  return information.features[0].geometry.coordinates;
};

module.exports = geocodeFunction;
