const mongoose = require("mongoose");
const Product = require("./productModel"); // Assuming you have a Product model

const buildSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  buildName: {
    type: String,
    required: true,
  },
  items: [Product.schema], // Use the productSchema for build items
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Build = mongoose.model("Build", buildSchema);

module.exports = Build;
