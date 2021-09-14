const express = require('express');

const Router = express.Router();

const productValidation = require('../validations/products/addProductValidation');
const productIdValidation = require('../validations/products/productId');

const {
  addProduct, 
  getAll,
  getById,
} = require('../controllers/products');

Router.route('/')
  .get(getAll)
  .post(productValidation, addProduct);

Router.route('/:id')
  .get(productIdValidation, getById);
  
module.exports = Router;
