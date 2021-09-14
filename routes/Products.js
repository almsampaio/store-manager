const express = require('express');

const Router = express.Router();

const productValidation = require('../validations/products/addProductValidation');

const {
  addProduct,
} = require('../controllers/products');

Router.use(productValidation);

Router.post('/', addProduct);

module.exports = Router;
