const express = require("express");
const Clothing = require("../models/Clothing");
const router = new express.Router();

/*Return all clothing, gives 500 status if doesn't work*/
router.get("/clothing", async (req, res) => {
  try {
    const clothingArray = await Clothing.find();
    if (clothingArray.length === 0) {
      return res.send("No clothing registered");
    }
    res.send(clothingArray);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Return clothing with given id*/
router.get("/clothing/:id", async (req, res) => {
  try {
    const clothing = await Clothing.findById(req.params.id);
    res.send(clothing);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Posts a clothing with sent body to database and also returns the clothing that was added*/
router.post("/clothing", async (req, res) => {
  try {
    const clothing = new Clothing(req.body);
    const clothingSaved = await clothing.save();
    res.send(clothingSaved);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*delete certain clothing by id*/
router.delete("/clothing/:id", async (req, res) => {
  try {
    const deletedClothing = await Clothing.findByIdAndDelete(req.params.id);
    res.send(deletedClothing);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
