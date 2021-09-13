const express = require('express');

const router = express.Router();

const {
  addNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers');

router.post('/', addNewProduct);

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
