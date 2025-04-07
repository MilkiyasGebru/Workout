const express = require('express');

const router = express.Router();

const {loginUser, signupUser} = require('../controllers/UserController');

// Handle User Login
router.post("/login",loginUser);


// Handle User Signup
router.post("/signup",signupUser);


module.exports = router;