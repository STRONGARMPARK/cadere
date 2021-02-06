const express = require("express");
const weather = require("../weather/weather");
const router = new express.Router();

/*Returns weather summary for given location*/
router.get("/weather/:location", async (req, res) => {
  try {
    const place = req.params.location;
    const forecast = await weather(place);
    res.send({
      locationName: forecast[0],
      locationRegion: forecast[1],
      locationTemp: forecast[2],
      locationFeelsLike: forecast[3],
    });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
