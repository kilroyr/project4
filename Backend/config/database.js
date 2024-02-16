const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    // MongoDB connection URI
    const uri = "mongodb://localhost:27017/PcPartPicker";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({ name: "admin" });
    if (!existingAdmin) {
      // Hash admin password
      const hashedPassword = await bcrypt.hash("admin@2024", 10);

      // Create admin document
      await User.create({
        name: "admin",
        email: "admin@abc.com",
        password: hashedPassword,
        userType: 1,
      });

      console.log("Admin inserted successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
