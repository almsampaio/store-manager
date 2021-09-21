const express = require('express');
const validations = require('../middlewares/validations');
const Products = require('../controllers/Products');

const router = express.Router();

router.post('/', validations.validateName, validations.validateQuantity, Products.create);

router.get('/', Products.getAll);

router.get('/:id', Products.getById);

router.put('/:id', validations.validateName, validations.validateQuantity, Products.update);

module.exports = router;
