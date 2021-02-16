const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  try {
    const userToken = req.header("authorization");
    const verified = jwt.verify(userToken, "randomsecret");
    const user = await User.findOne({
      _id: verified._id,
      tokens: userToken,
    });

    if (user === null) {
      throw new Error("invalid authentication");
    }
    req.user = user;
    req.token = userToken;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "authentication failed" });
  }
};

module.exports = authentication;
