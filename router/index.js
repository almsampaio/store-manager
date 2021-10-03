const express = require('express');
const products = require('./routerProduct');

const router = express.Router();

router.use('/products', products);

module.exports = {
  router,
};
