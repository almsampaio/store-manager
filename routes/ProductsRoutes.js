const express = require('express');

const router = express.Router();

const {
  addNewProduct,
  getAllProducts,
  getProduct,
} = require('../controllers');

router.post('/', addNewProduct);

router.get('/', getAllProducts);

router.get('/:id', getProduct);

module.exports = router;
