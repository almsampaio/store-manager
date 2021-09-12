const express = require('express');
const {
  productValidate, idValidate, alreadyExistsName,
} = require('../middleware/productValidation');

const router = express.Router();
const productsController = require('../controllers/productsController');

const allValidations = [idValidate, productValidate, alreadyExistsName];

router.get('/', productsController.getAll);

router.get('/:id', idValidate, productsController.getById);

router.post('/', productValidate, alreadyExistsName, productsController.create);

router.put('/:id', ...allValidations, productsController.update);

router.delete('/:id', idValidate, productsController.deleteById);

module.exports = router;
