const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("../database/database-connect");

//net worth is actually how much all of their clothes are worth combined
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: false,
  },
  netWorth: {
    type: Number,
    required: false,
  },
  tokens: [],
});

schema.virtual("clothing", {
  ref: "Clothing",
  localField: "_id",
  foreignField: "wearer",
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashed = await bycrypt.hash(this.password, 8);
      this.password = hashed;
    } catch (e) {
      console.log(e);
    }
  }
  next();
});

schema.statics.checkRealUser = async (username) => {
  const realUser = await User.findOne({ username: username });
  return realUser;
};

schema.statics.checkPassword = async (username, password) => {
  const user = await User.findOne({ username: username });
  const verifiedUser = await bycrypt.compare(password, user.password);
  return verifiedUser;
};

schema.methods.makejwtToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "randomsecret");
  this.tokens.push(token);
  await this.save();
};

const User = mongoose.model("User", schema);

module.exports = User;
