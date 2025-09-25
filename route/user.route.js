const express = require('express');
const router = express.Router();
const {login, signup, otp, resetPassword} = require('../controller/user.controller.js');
const {protect, adminProtect} = require('../middleware/auth.middleware.js');

router.post('/login', login);
router.post('/signup', signup);
router.post('/otp', otp);
router.post('/resetPassword', resetPassword);

module.exports = router;