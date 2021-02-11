const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const authentication = require("../../js-middleware/token-authentication");

router.post("/users/login", async (req, res) => {
  try {
    const vUser = await User.verifiedUser(req.body.username, req.body.password);
    console.log(vUser);
    const jwToken = await vUser.makeToken();
    res.send({ vUser: vUser, jwToken: jwToken });
  } catch (e) {
    // res.status(500).send("Error occured during authentication");
    console.log(e);
  }
});

/*Return all users, gives 500 status if doesn't work*/
router.get("/users", authentication, async (req, res) => {
  try {
    const userArray = await User.find();
    if (userArray.length === 0) {
      return res.send("There are no users in the database");
    }
    res.send(userArray);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Return user with given id*/
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Posts a user with sent body to database and also returns the user that was added*/
router.post("/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const userSaved = await user.save();
    res.send(userSaved);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Update a current user with given id to a new name that is specified by body
  If body passes in a key that is not valid, nothing will happen to the user*/
router.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*delete certain user by id*/
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedElement = await User.findByIdAndDelete(req.params.id);
    res.send(deletedElement);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
