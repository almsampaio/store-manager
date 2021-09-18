// conecta controller com o service
const productsService = require('../services/productsService');

// conecta controller com o model
const productsModel = require('../models/productsModel');

const lessThan5 = '"name" length must be at least 5 characters long';
const productExists = 'Product already exists';
const notNumber = '"quantity" must be a number';
const lessEqualThan0 = '"quantity" must be larger than or equal to 1';
const notFound = 'Wrong id format';

const postProduct = async (request, response) => {
  const { name, quantity } = request.body;
  const product = await productsService.postProduct(name, quantity);
  if (product === 'name less than 5') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessThan5 } });
  }
  if (product === 'Product already exists') {
    return response.status(422).json({ err: { code: 'invalid_data', message: productExists } });
  }
  if (product === 'Not a Number') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notNumber } });
  }
  if (product === 'quantity less or equal than 0') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessEqualThan0 } });
  }
  return response.status(201).json(product);
};

const getAllProducts = async (_request, response) => {
  const allProducts = await productsModel.getAllProducts();
  return response.status(200).json(allProducts);
};

const getProductsByID = async (request, response) => {
  const { id } = request.params;
  const productByID = await productsService.getProductsByID(id);
  if (productByID === 'Product not Found') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notFound } });
  }
  return response.status(200).json(productByID);
};

const updateProductsByID = async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const updateProduct = await productsService.updateProductsByID(id, name, quantity);
  if (updateProduct === 'name less than 5') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessThan5 } });
  }
  if (updateProduct === 'Not a Number') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notNumber } });
  }
  if (updateProduct === 'quantity less or equal than 0') {
    return response.status(422).json({ err: { code: 'invalid_data', message: lessEqualThan0 } });
  }
  return response.status(200).json(updateProduct);
};

const deleteProductByID = async (request, response) => {
  const { id } = request.params;
  const deleteProduct = await productsService.deleteProductByID(id);
  if (deleteProduct === 'Product not Found') {
    return response.status(422).json({ err: { code: 'invalid_data', message: notFound } });
  }
  return response.status(200).json(deleteProduct);
};

module.exports = {
  postProduct,
  getAllProducts,
  getProductsByID,
  updateProductsByID,
  deleteProductByID,
};
