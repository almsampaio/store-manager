const express = require('express');
const { createProduct, getAllProducts,
  getProductById, setProduct, deleteProduct } = require('../controllers/Products');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', setProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
