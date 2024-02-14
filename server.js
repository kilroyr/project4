// Require modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { body } = require('express-validator');

// Create app 
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); 

// Validation middleware
app.post( "/api/users",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 })
);

// Rate limiting, CORS, Helmet, compression, etc

// Routes
app.use('/api/users', require('./routes/users'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error'); 
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));