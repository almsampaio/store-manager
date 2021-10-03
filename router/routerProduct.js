const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.products.addProduct);
router.get('/', Controller.products.getProducts);

module.exports = {
  router,
};