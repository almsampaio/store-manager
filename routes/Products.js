const express = require('express');
const { createProduct, getAllProducts, getProductById } = require('../controllers/Products');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

module.exports = router;
