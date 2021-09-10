const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');
const { productAlreadyExists } = require('../../services/productService');
const AppError = require('./error');

const errorsMessages = {
  code: 'invalid_data',
  nameLengthGT: '"name" length must be at least 5 characters long',
  productAlreadyExists: 'Product already exists',
  qtyMustBeANumber: '"quantity" must be a number',
  qtyGTEOne: '"quantity" must be larger than or equal to 1',
  wrongIdFormat: 'Wrong id format',
  productDontFound: 'Product dont found',
};

const isValidLength = (str, min, max) => typeof str === 'string'
  && str.length >= min && str.length <= max;

const isValidQuantityGreaterZero = (number, min, max) => typeof number === 'number'
  && number >= min && number <= max;

const isValidName = rescue(async (req, _res, next) => {
  const { name } = req.body;
  const minLength = 6;

  if (!isValidLength(name, minLength, Infinity)) {
    throw new AppError('Validation: "name" length >= 5',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.nameLengthGT,
      } });
  }

  const productExists = await productAlreadyExists(name);
  if (productExists) {
    throw new AppError('Validation: product already exists',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.productAlreadyExists,
      } });
  }

  return next();
});

const isValidQuantity = rescue(async (req, res, next) => {
  const { quantity } = req.body;

  const minQty = 1;

  if (typeof quantity === 'string') {
    throw new AppError('Validation: Quantity must be a number',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.qtyMustBeANumber,
      } });
  }

  if (!isValidQuantityGreaterZero(quantity, minQty, Infinity)) {
    throw new AppError('Validation: Quantity >= 1',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.qtyGTEOne,
      } });
  }

  return next();
});

const isValidId = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (typeof id !== 'string' || !ObjectID.isValid(id)) {
    throw new AppError('Validation: Wrong ID',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.wrongIdFormat,
      } });
  }

  return next();
});

module.exports = {
  isValidName,
  isValidQuantity,
  isValidId,
  errorsMessages,
};