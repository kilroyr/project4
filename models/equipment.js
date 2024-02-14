const mongoose = require("mongoose");

const partsSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  modification: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("parts", partsSchema);
