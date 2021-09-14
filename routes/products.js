const { Router } = require('express');

const router = new Router();

const { create } = require('../controllers/products');

const productVerifier = require('../services/validations');

router.post('/', productVerifier.productsValidation, create);

module.exports = router;