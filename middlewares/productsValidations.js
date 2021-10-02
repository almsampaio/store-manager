const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const NAME_LENGTH_ERROR_MESSAGE = '"name" length must be at least 5 characters long';
const PRODUCT_ALREADY_EXISTS_ERROR_MESSAGE = 'Product already exists';
const QUANTITY_LTE_ZERO_ERROR_MESSAGE = '"quantity" must be larger than or equal to 1';
const QUANTITY_NOT_NUMBER_ERROR_MESSAGE = '"quantity" must be a number';
const WRONG_ID_FORMAT_ERROR = 'Wrong id format';

function nameLengthValidation(req, _res, next) {
  const { name } = req.body;
  
  if (name.length < 5) {
    next({ status: 422, code: 'invalid_data', message: NAME_LENGTH_ERROR_MESSAGE });
  }

  next();
}

async function notEqualNameValidation(req, _res, next) {
  const { name } = req.body;

  const products = await Products.getProducts();
  const equalProduct = products.find((product) => product.name === name);
  
  if (equalProduct) {
    next({ status: 422, code: 'invalid_data', message: PRODUCT_ALREADY_EXISTS_ERROR_MESSAGE });
  }

  next();
}

function quantityGreaterThanZeroValidation(req, _res, next) {
  const { quantity } = req.body;

  if (quantity <= 0) {
    next({ status: 422, code: 'invalid_data', message: QUANTITY_LTE_ZERO_ERROR_MESSAGE });
  }

  next();
}

function quantityMustBeANumberValidation(req, _res, next) {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    next({ status: 422, code: 'invalid_data', message: QUANTITY_NOT_NUMBER_ERROR_MESSAGE });
  }

  next();
}

function isValidId(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    next({ status: 422, code: 'invalid_data', message: WRONG_ID_FORMAT_ERROR });
  }

  next();
}

module.exports = {
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
  isValidId,
};
