const express = require('express');
const products = require('./routerProduct');
const sales = require('./routerSales');

const router = express.Router();

router.use('/products', products);
router.use('/sales', sales);

module.exports = {
  router,
};
