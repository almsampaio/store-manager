const express = require('express');

const productsController = require('./src/controller/productsController');
const {
  nameValidation,
  productHasExists,
  quantityMustBeGreaterThenOne,
} = require('./src/controller/validations/productsValidations');

const routes = express.Router();

routes.post(
  '/products',
  nameValidation,
  quantityMustBeGreaterThenOne,
  productHasExists,
  productsController.create,
);

module.exports = routes;
