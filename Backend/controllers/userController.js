const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Controller function for user signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      "pcpartpicker@2024",
      { expiresIn: "1h" }
    );

    res.json({ token, userType: user.userType, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all users (accessible only to admin)
const getUsers = async (req, res) => {
  try {
    if (req.userType !== 1) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }

    const users = await User.find({ userType: { $ne: 1 } }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
};
