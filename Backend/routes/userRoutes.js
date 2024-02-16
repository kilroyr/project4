const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    getUsers
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login); 

// Route for getting all users (accessible only to admin)
router.get('/allusers', authMiddleware, getUsers);

module.exports = router;
