const request = require("request-promise");
const geocode = require("./geocode");
const forecast = require("./forecast");

const totalWeather = async (location) => {
  const coordinates = await geocode(location);
  const forecastReturn = await forecast(coordinates);
  return forecastReturn;
};

// totalWeather("connecticut").then((forecast) => {
//   console.log(forecast);
// });

module.exports = totalWeather;
