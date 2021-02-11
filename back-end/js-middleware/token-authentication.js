const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const middleFunction = async (req, res, finished) => {
  try {
    const userToken = req.header("token");
    const verified = jwt.verify(userToken, "randomsecret");
    const user = await User.findOne({
      _id: verified._id,
      "userTokens.token": userToken,
    });

    if (user === null) {
      throw new Error("invalid authentication");
    }

    req.user = user;

    finished();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = middleFunction;
