const express = require('express');

const Router = express.Router();

const productValidation = require('../validations/products/addProductValidation');
const productIdValidation = require('../validations/products/productId');

const {
  addProduct, 
  getAll,
  getById,
  updateProduct,
  deleteProduct,
} = require('../controllers/Products');

Router.route('/')
  .get(getAll)
  .post(productValidation, addProduct);

Router.route('/:id')
  .get(productIdValidation, getById)
  .put(
    productIdValidation, 
    productValidation, 
    updateProduct,
  )
  .delete(
    productIdValidation,
    deleteProduct,
  );
  
module.exports = Router;
