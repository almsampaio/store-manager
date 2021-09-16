const express = require('express');

const productsController = require('./src/controller/productsController');
const salesController = require('./src/controller/salesController');

const {
  nameValidation,
  productHasExists,
  quantityMustBeGreaterThenOne,
  isValidId,
} = require('./src/controller/validations/productsValidations');
const {
  productValidation,
  saleExistsValidation,
} = require('./src/controller/validations/salesValidations');

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

routes.delete('/products/:id', isValidId, productHasExists, productsController.delete);

routes.post('/sales', productValidation, salesController.create);

routes.get('/sales', salesController.index);

routes.get('/sales/:id', saleExistsValidation, salesController.index);

routes.put('/sales/:id', saleExistsValidation, salesController.update);

module.exports = routes;
