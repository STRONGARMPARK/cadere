const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  temp: {
    type: Number,
    required: false,
  },
  purchased: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
  wearer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Clothing = mongoose.model("Clothing", schema);

module.exports = Clothing;
