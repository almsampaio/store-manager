const { ObjectId } = require('bson');
const generateError = require('../utils/errorMessage');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const regexName = /^([a-zA-Z\u00C0-\u017F ]{5,})/;

const INVALID_DATA = 'invalid_data';
const CHARACTER_LONG = '"name" length must be at least 5 characters long';
const QUANTITY_GT_1 = '"quantity" must be larger than or equal to 1';
const TYPE_MB_NUMBER = '"quantity" must be a number';
const PRODUCT_ALREADY_EXISTS = 'Product already exists';
const WRONG_ID_FORMAT = 'Wrong id format';
const INVALID_ID_OR_QUANTITY = 'Wrong product ID or invalid quantity';
const NOT_FOUND = 'not_found';
const SALE_NOT_FOUND = 'Sale not found';
const INVALID_SALE_ID = 'Wrong sale ID format';
const STOCK_PROBLEM = 'stock_problem';
const NO_STOCK_MESSAGE = 'Such amount is not permitted to sell';

const notValidId = () => generateError(INVALID_DATA, WRONG_ID_FORMAT);

const notValidIdOrQuantity = () => generateError(INVALID_DATA, INVALID_ID_OR_QUANTITY);

const saleNotFound = () => generateError(NOT_FOUND, SALE_NOT_FOUND);

const validateName = (name) => {
  if (!regexName.test(name)) {
    return generateError(INVALID_DATA, CHARACTER_LONG);
  }
};

const decreaseProductStock = async (id, quantity) => {
  const product = await productsModel.getProductById(id);

  if (product.quantity >= quantity) {
    const newQuantity = product.quantity - quantity;
    await productsModel.updateOnlyProductQuantity(id, newQuantity);
    return null;
  }
  return generateError(STOCK_PROBLEM, NO_STOCK_MESSAGE);
};

const increaseProductStock = async (id, quantity) => {
  const product = await productsModel.getProductById(id);
  const newQuantity = product.quantity + quantity;
  await productsModel.updateOnlyProductQuantity(id, newQuantity);
};

const verifyIdSale = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    const errorMessage = generateError(INVALID_DATA, INVALID_SALE_ID);
    return { errorMessage };
  }

  return { sale };
};

const differenceInSale = async (id, newQuantity) => {
  const actualSale = await verifyIdSale(id);
  const { sale: { itensSold } } = actualSale;
  const { quantity } = itensSold[0];
  return quantity - newQuantity;
};

const validateIdSale = (id) => {
  if (!ObjectId.isValid(id)) {
    return notValidIdOrQuantity();
  }
};

const validateSale = async (id, quantity) => {
  const product = await productsModel.getProductById(id);
  if (!product || quantity < 1 || (typeof quantity !== 'number')) {
    const notValid = notValidIdOrQuantity();
    return { notValid };
  }
  const error = await decreaseProductStock(id, quantity);
  return { error };
};

const validateIfNameAlreadyExists = async (name) => {
  if (await productsModel.getProductByName(name)) {
    return generateError(INVALID_DATA, PRODUCT_ALREADY_EXISTS);
  }
};

const verifyTypeQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return generateError(INVALID_DATA, TYPE_MB_NUMBER);
  }
};

const verifyLengthQuantity = (quantity) => {
  if (quantity < 1) {
    return generateError(INVALID_DATA, QUANTITY_GT_1);
  }
};

const validationToCreate = async (name, quantity) => {
  if (validateName(name)) return validateName(name);
  const result = await validateIfNameAlreadyExists(name);
  if (result) return result;
  if (verifyTypeQuantity(quantity)) return verifyTypeQuantity(quantity);
  if (verifyLengthQuantity(quantity)) return verifyLengthQuantity(quantity);
};

const validateToUpdate = (name, quantity) => {
  if (validateName(name)) return validateName(name);
  if (verifyTypeQuantity(quantity)) return verifyTypeQuantity(quantity);
  if (verifyLengthQuantity(quantity)) return verifyLengthQuantity(quantity);
};

module.exports = {
  notValidId,
  validationToCreate,
  validateToUpdate,
  validateSale,
  saleNotFound,
  verifyIdSale,
  increaseProductStock,
  decreaseProductStock,
  differenceInSale,
  validateIdSale,
};
