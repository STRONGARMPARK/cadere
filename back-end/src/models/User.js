const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

module.exports = User;
