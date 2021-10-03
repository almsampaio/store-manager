const express = require('express');
const products = require('./routerProducts');

const router = express.Router();

router.use('/products', products);

module.exports = {
  router,
};
