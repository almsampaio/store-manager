const generateError = require('../utils/errorMessage');
const productsModel = require('../models/productsModel');

const regexName = /^([a-zA-Z\u00C0-\u017F ]{5,})/;

const INVALID_DATA = 'invalid_data';
const CHARACTER_LONG = '"name" length must be at least 5 characters long';
const QUANTITY_GT_1 = '"quantity" must be larger than or equal to 1';
const TYPE_MB_NUMBER = '"quantity" must be a number';
const PRODUCT_ALREADY_EXISTS = 'Product already exists';
const WRONG_ID_FORMAT = 'Wrong id format';

const notValidId = () => {
  const errorMessage = generateError(INVALID_DATA, WRONG_ID_FORMAT);
  return errorMessage;
};

const validateName = (name) => {
  if (!regexName.test(name)) {
    const errorMessage = generateError(INVALID_DATA, CHARACTER_LONG);
    return { errorMessage };
  }
};

const validateAlreadyExists = async (name) => {
  if (await productsModel.getProductByName(name)) {
    const errorMessage = generateError(INVALID_DATA, PRODUCT_ALREADY_EXISTS);
    return { errorMessage };
  }
};

const verifyTypeQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    const errorMessage = generateError(INVALID_DATA, TYPE_MB_NUMBER);
    return { errorMessage };
  }
};

const verifyLengthQuantity = (quantity) => {
  if (quantity < 1) {
    const errorMessage = generateError(INVALID_DATA, QUANTITY_GT_1);
    return { errorMessage };
  }
};

const validationToCreate = async (name, quantity) => {
  if (validateName(name)) return validateName(name);
  const result = await validateAlreadyExists(name);
  if (result) return result;
  if (verifyTypeQuantity(quantity)) return verifyTypeQuantity(quantity);
  if (verifyLengthQuantity(quantity)) return verifyLengthQuantity(quantity);
};

module.exports = {
  notValidId,
  validationToCreate,
};
