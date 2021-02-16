const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/token-authentication");
const Clothing = require("../models/clothing");
const User = require("../models/user");

router.get("/clothing", authentication, async (req, res) => {
  const owner = req.user;
  await owner.populate("clothing").execPopulate();
  res.send(owner.clothing);
});
router.post("/clothing", authentication, async (req, res) => {
  const clothing = new Clothing({
    ...req.body,
    wearer: req.user._id,
  });
  await clothing.save();
  res.send(clothing);
});
router.patch("/clothing", authentication, async (req, res) => {});
router.delete("/clothing", authentication, async (req, res) => {});

module.exports = router;
