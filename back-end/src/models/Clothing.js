const mongoose = require("mongoose");

const Clothing = mongoose.model("Clothing", {
  name: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = Clothing;
