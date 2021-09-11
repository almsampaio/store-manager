const express = require('express');
const { productsControllers } = require('../controllers');
const check = require('../utils');

const router = express.Router();

router.post('/', check.createProducts, productsControllers.createProduct);

module.exports = router;
