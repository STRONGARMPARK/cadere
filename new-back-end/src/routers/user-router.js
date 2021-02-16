const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/token-authentication");

//return all users
router.get("/users/perso", authentication, async (req, res) => {
  res.send(req.user);
});

//create new user, req body will provide name, username, email and password
//password will be hashed
router.post("/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const realUser = await user.save();
    await realUser.makejwtToken();
    res.send(realUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

//edit user
router.patch("/users/edit", async (req, res) => {});

//delete a user by username
router.delete("/users", async (req, res) => {});

//log out
router.post("/users/logout", authentication, async (req, res) => {
  try {
    console.log;
    console.log(req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token !== req.token;
    });
    await req.user.save();
    res.send("logged out");
  } catch (e) {}
});

//log in, req body expected is username and password
router.get("/users/login", async (req, res) => {
  const realUser = await User.checkRealUser(req.body.username);
  if (!realUser) {
    return res.send("no user with that username");
  }
  const verifiedUser = await User.checkPassword(
    req.body.username,
    req.body.password
  );
  if (!verifiedUser) {
    return res.send("incorrect username or password");
  }
  await realUser.makejwtToken();
  res.send(realUser);
});

module.exports = router;
