const express = require('express');
const products = require('./productsRouter');
const sales = require('./salesRouter');

const router = express.Router();

router.use('/products', products);
router.use('/sales', sales);

module.exports = router;