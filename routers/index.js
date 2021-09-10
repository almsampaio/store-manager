const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const productsRouter = require('./productsRouter');

router.use('/products', rescue(productsRouter));

module.exports = router;
