const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter a valid email");
      }
    },
  },
  password: {
    required: true,
    type: String,
  },
  age: {
    type: Number,
  },
});

schema.statics.verifiedUser = async (username, password) => {
  const existUser = await User.findOne({ username: username });
  if (existUser === null) {
    throw new Error("There is no user with that username");
  }
  const verified = await bcrypt.compare(password, existUser.password);
  if (!verified) {
    throw new Error("Incorrect Password");
  }
  return existUser;
};

schema.pre("save", async function (finished) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 7);
  }
  return finished();
});

const User = mongoose.model("User", schema);

// const testing = new User({
//   name: "Armstrong",
//   username: "something",
//   email: "goasdflkjasdf@gmail.com",
//   password: "password",
//   age: 39,
// });

// testing
//   .save()
//   .then(() => {})
//   .catch(() => {});

module.exports = User;
