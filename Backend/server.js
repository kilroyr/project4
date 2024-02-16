const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const buildRoutes = require("./routes/buildRoutes");

const connectDB = require("./config/database");

connectDB();

// Middleware
app.use(express.json());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/build", buildRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
