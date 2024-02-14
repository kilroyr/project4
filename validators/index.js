const mongoose = require("mongoose");

const checkIfValidObjectId = (value, helpers) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return value;
  } else {
    throw new Error("userId should be a valid ObjectId");
  }
};

module.exports = {
  checkIfValidObjectId,
};
