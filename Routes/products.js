const express = require('express');
const productController = require('../controllers/products');
const { validateNewProduct } = require('../middlewares/products');

const router = express.Router();

router.post('/', validateNewProduct, productController.addNew);

module.exports = router;
