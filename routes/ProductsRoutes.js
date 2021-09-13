const express = require('express');

const router = express.Router();

const {
  addNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} = require('../controllers');

router.post('/', addNewProduct);

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.put('/:id', updateProduct);

module.exports = router;
