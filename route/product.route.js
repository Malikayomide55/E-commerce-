const express = require('express');
const router = express.Router();
const {createProduct, getProduct, getProductById} = require('../controller/product.controller.js');
const {protect} = require('../middleware/auth.middleware.js');

router.post('/createProduct', protect, createProduct);

router.get('/getProduct', getProduct);
router.get('/getProductById/:id', getProductById);

module.exports = router;