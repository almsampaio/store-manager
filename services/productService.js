const productModel = require('../models/productModel');

const ERROR_NAME = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long', 
  },
}; 
const ERROR_QUANTITY = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1', 
  },
};

const ERROR_TYPEOF_QUANTITY = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number', 
  },
};

const ERROR_ALREADY_EXISTS = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists', 
  },
};

const nameValidation = (name) => {
  const nameRegex = /^.{5,}$/;
  return nameRegex.test(name);
};
const quantityValidation = (quantity) => quantity >= 1;

const numberValidation = (quantity) => typeof (quantity) === 'number';

const createProduct = async (name, quantity) => {
  if (!nameValidation(name)) return ERROR_NAME;
  if (!numberValidation(quantity)) return ERROR_TYPEOF_QUANTITY;
  if (!quantityValidation(quantity)) return ERROR_QUANTITY;
  const productAlreadyExists = await productModel.getByName(name);
  if (productAlreadyExists) return ERROR_ALREADY_EXISTS;
  
  return productModel.createProduct(name, quantity);
};

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  return allProducts;
};

module.exports = {
  createProduct,
  getAllProducts,
};
