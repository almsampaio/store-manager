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

router.put('/:id',
  validations.validateName,
  validations.validateQuantityGreaterThanZero,
  validations.validateQuantityisNumber,
  productController.update);

router.delete('/:id',
  validations.validateProductIdExists,
  productController.exclude);

module.exports = router;