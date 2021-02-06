const request = require("request-promise");
const geocode = require("./geocode");

const getWeather = async ([longitude, latitude]) => {
  const url = `http://api.weatherstack.com/current?access_key=bb2b807df29b284655f45e83bfb6d339&query=${latitude},${longitude}&units=f`;
  const forecast = await request({ url: url, json: true });
  return [
    forecast.location.name,
    forecast.location.region,
    forecast.current.temperature,
    forecast.current.feelslike,
  ];
};

module.exports = getWeather;
