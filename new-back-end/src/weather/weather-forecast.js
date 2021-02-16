const request = require("request-promise");

const weatherForecast = async (coordinates) => {
  url = `http://api.weatherstack.com/current?access_key=bb2b807df29b284655f45e83bfb6d339&query=${coordinates[1]},${coordinates[0]}&units=f`;

  const forecast = await request(url, { json: true });
  return {
    locationName: forecast.location.name,
    region: forecast.location.region,
    feelslike: forecast.current.feelslike,
    temperature: forecast.current.temperature,
  };
};

module.exports = weatherForecast;
