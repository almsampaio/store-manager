const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.products.addProduct);
router.get('/', Controller.products.getProducts);
router.get('/:id', Controller.products.getProductById);
router.put('/:id', Controller.products.productUpdate);

module.exports = {
  router,
};