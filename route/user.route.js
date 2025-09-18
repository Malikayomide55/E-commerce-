const express = require('express');
const router = express.Router();
const {login, signup, otp} = require('../controller/user.controller.js');
const {protect} = require('../middleware/auth.middleware.js');

router.post('/login', login);
router.post('/signup', signup);
router.post('/otp', otp);

module.exports = router;