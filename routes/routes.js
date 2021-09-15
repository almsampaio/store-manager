const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const productMiddleware = require('../midllewares/productMiddleware');

router.post('/products', productMiddleware.validate, productController.createProduct);

module.exports = router;