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

const notValidId = () => generateError(INVALID_DATA, WRONG_ID_FORMAT);

const notValidIdOrQuantity = () => generateError(INVALID_DATA, INVALID_ID_OR_QUANTITY);

const saleNotFound = () => generateError(NOT_FOUND, SALE_NOT_FOUND);

const validateName = (name) => {
  if (!regexName.test(name)) {
    return generateError(INVALID_DATA, CHARACTER_LONG);
  }
};

const verifyIdSale = async (id) => {
  const deletedSale = await salesModel.getSaleById(id);

  if (!deletedSale) {
    const errorMessage = generateError(INVALID_DATA, INVALID_SALE_ID);
    return { errorMessage };
  }

  return { deletedSale };
};

const validateSale = async (id, quantity) => {
  const product = await productsModel.getProductById(id);
  if (!product || quantity < 1 || (typeof quantity !== 'number')) {
    return notValidIdOrQuantity();
  }
  return null;
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
};
