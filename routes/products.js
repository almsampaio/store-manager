const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validations = require('../middlewares/validations');

router.post('/',
  validations.validateName,
  validations.validateProductExists,
  validations.validateQuantityGreaterThanZero,
  validations.validateQuantityisNumber,
  productController.create);

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

module.exports = router;