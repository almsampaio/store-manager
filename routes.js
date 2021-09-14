const express = require('express');

const productsController = require('./src/controller/productsController');
const {
  nameValidation,
  productHasExists,
  quantityMustBeGreaterThenOne,
  isValidId,
} = require('./src/controller/validations/productsValidations');

const routes = express.Router();

routes.post(
  '/products',
  nameValidation,
  quantityMustBeGreaterThenOne,
  productHasExists,
  productsController.create,
);

routes.get('/products', productsController.index);

routes.get('/products/:id', isValidId, productsController.index);

routes.put(
  '/products/:id',
  nameValidation,
  quantityMustBeGreaterThenOne,
  productHasExists, 
  productsController.update,
);

module.exports = routes;
