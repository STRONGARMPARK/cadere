const geocode = require("./geocode");
const forecast = require("./weather-forecast");

const completeWeather = async (postCode) => {
    const coordinates = await geocode(postCode);
    const totalForecast = await forecast(coordinates);
    return totalForecast;
};

module.exports = completeWeather;
