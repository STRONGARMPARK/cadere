const express = require("express");
const weather = require("../weather/complete-weather");

const router = new express.Router();

/*gets weather with given postcode just type localhost:3000/weather/POST_CODE_HERE, however 
this will most likely not need to be used as most of this is provided by the user-router for log-in*/
router.get("/weather/:postcode", async (req, res) => {
    const forecast = await weather(req.params.postcode);
    res.send(forecast);
});

module.exports = router;
