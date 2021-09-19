const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/Products');

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

module.exports = router;
