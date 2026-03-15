const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { authSchemas } = require('../utils/validationSchemas');

const router = express.Router();

// Signup
router.post('/signup', validate(authSchemas.signup), authController.signup);

// Login
router.post('/login', validate(authSchemas.login), authController.login);

// Get current user profile
router.get('/me', authenticate, authController.getMe);

module.exports = router;
