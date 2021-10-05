const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_NAME = { err: {
  code: ERROR_CODE_400,
  message: '"name" length must be at least 5 characters long',
} };
const ERROR_QTY_STRING = { err: {
  code: ERROR_CODE_400,
  message: '"quantity" must be a number',
} };
const ERROR_QTY_NUMBER = { err: {
  code: ERROR_CODE_400,
  message: '"quantity" must be larger than or equal to 1',
} };
const ERROR_ALREADY_EXISTS = { err: {
  code: ERROR_CODE_400,
  message: 'Product already exists',
} };
const ERROR_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong id format',
} };

const nameValidator = (name) => {
  const nameRegex = /^.{5,}$/;

  return nameRegex.test(name);
};

const idValidator = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const quantityTypeValidator = (quantity) => typeof (quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const addProduct = async (productData) => {
  const { name, quantity } = productData;

  if (!nameValidator(name)) return ERROR_NAME;

  if (!quantityTypeValidator(quantity)) return ERROR_QTY_STRING;

  if (!quantityValidator(quantity)) return ERROR_QTY_NUMBER;

  const alreadyExists = await Model.products.getProductByName(name);

  if (alreadyExists) return ERROR_ALREADY_EXISTS;

  return Model.products.addProduct(productData);
};

const getProducts = () => Model.products.getProducts();

const getProductById = async (id) => {
  if (!idValidator(id)) return ERROR_ID;

  const product = await Model.products.getProductById(id);

  if (!product) return ERROR_ID;

  return product;
};

const testUpdateProduct = (updatedProduct) => {
  const { name, quantity } = updatedProduct;
  if (!nameValidator(name)) return ERROR_NAME;

  if (!quantityTypeValidator(quantity)) return ERROR_QTY_STRING;

  if (!quantityValidator(quantity)) return ERROR_QTY_NUMBER;
};

const updateProduct = async (id, updatedProduct) => {
  if (!idValidator(id)) return ERROR_ID;

  testUpdateProduct(updatedProduct);
  const { name, quantity } = updatedProduct;

  const product = await Model.products.updateProduct(id, { name, quantity });

  return (product.matchedCount === 1) ? { _id: id, name, quantity } : ERROR_ID;
};

const deleteProduct = async (id) => {
  if (!idValidator(id)) return ERROR_ID;

  const deletedProduct = await Model.products.getProductById(id);

  const product = await Model.products.deleteProduct(id);

  return (product.deletedCount === 1) ? deletedProduct : ERROR_ID;
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};