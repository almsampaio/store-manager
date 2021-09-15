const ProductsModel = require('../models/ProductsModel');
const SalesModel = require('../models/SalesModel');

const errors = {
  SALES_ERROR: 'Wrong product ID or invalid quantity',
  INVALID_AMOUNT: 'Such amount is not permitted to sell',
  WRONG_ID: 'Wrong sale ID format',
  NOT_FOUND: 'Sale not found',
};
const status = 422;
const code = 'invalid_data';

const isGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');
const isItExist = async (value) => {
  const product = await ProductsModel.getById(value);
  if (!product) return true;
};

const checkStock = async (productId, quantity) => {
  const currentProduct = await ProductsModel.getById(productId);
  if (!currentProduct) return true;

  const newQuantity = currentProduct.quantity - quantity;
  if (newQuantity < 1) return true;

  await ProductsModel.update(productId, currentProduct.name, newQuantity);
  return false;
};

const validatePost = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const statusErr = 404;
  const codeErr = 'stock_problem';

  switch (true) {
    case isGreaterThan(quantity, 1): return { status, code, message: errors.SALES_ERROR };
    case typeOf(quantity): return { status, code, message: errors.SALES_ERROR };
    case (await isItExist(productId)): return { status, code, message: errors.SALES_ERROR };
    case (await (checkStock(productId, quantity))): return {
      status: statusErr, code: codeErr, message: errors.INVALID_AMOUNT,
    };
    default: return {};
  }
};

const validateGet = async (id) => {
  const statusErr = 404;
  const codeErr = 'not_found';
  const sales = await SalesModel.getById(id);  
  if (!sales) return { status: statusErr, code: codeErr, message: errors.NOT_FOUND };
  return {};
};

const validatePut = (itensSold) => {
  const { quantity } = itensSold[0];
  switch (true) {
    case isGreaterThan(quantity, 1): return { status, code, message: errors.SALES_ERROR };
    case typeOf(quantity): return { status, code, message: errors.SALES_ERROR };
    default: return {};
  }
};

const validateDelete = async (id) => {
  const sales = await SalesModel.getById(id);  
  if (!sales) return { status, code, message: errors.WRONG_ID };

  const { productId, quantity } = sales.itensSold[0];
  const currentProduct = await ProductsModel.getById(productId);
  const newQuantity = currentProduct.quantity + quantity;
  
  await ProductsModel.update(productId, currentProduct.name, newQuantity);
  return {};
};

module.exports = {
  validatePost,
  validateGet,
  validatePut,
  validateDelete,
};