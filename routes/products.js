const { Router } = require('express');

const router = new Router();

const { create, getAllProducts, getProductsById } = require('../controllers/products');

const productVerifier = require('../services/validations');

router.post('/', productVerifier.productsValidation, create);

router.get('/', getAllProducts);

router.get('/:id', getProductsById);

module.exports = router;