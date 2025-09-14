const express = require('express');
const router = express.Router();
const {login, signup} = require('../controller/user.controller.js');
const {protect} = require('../middleware/auth.middleware.js');

router.post('/login', protect, login);
router.post('/signup', signup);

module.exports = router;