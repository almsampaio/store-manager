const express = require('express');
const {
  productValidate, idValidate, alreadyExistsName,
} = require('../middleware/productValidation');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

router.get('/:id', idValidate, productsController.getById);

router.post('/', productValidate, alreadyExistsName, productsController.create);

module.exports = router;
