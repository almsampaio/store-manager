const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const productMiddleware = require('../midllewares/productMiddleware');

router.get('/products/:id', productController.findOneProduct);
router.get('/products', productController.findAllProducts);
router.post('/products', productMiddleware.validate, productController.createProduct);

module.exports = router;