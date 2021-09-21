const express = require('express');
const validations = require('../middlewares/validations');
const Products = require('../controllers/Products');

const router = express.Router();

router.post('/', validations.validateName, validations.validateQuantity, Products.create);

module.exports = router;
