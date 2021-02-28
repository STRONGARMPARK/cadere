const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
    try {
        const userToken = req.header("Authorization").replace("Bearer ", "");
        const verifiedUser = jwt.verify(userToken, "randomsecret");
        const user = await User.findOne({
            _id: verifiedUser._id,
            // tokens: userToken,
        });
        if (!user) {
            throw new Error("invalid authentication");
        }
        req.user = user;
        req.token = userToken;
        next();
    } catch (e) {
        res.send({ error: e.message });
    }
};

module.exports = authentication;
