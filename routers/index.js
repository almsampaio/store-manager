const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

router.use('/products', rescue(productsRouter));
router.use('/sales', rescue(salesRouter));

module.exports = router;
