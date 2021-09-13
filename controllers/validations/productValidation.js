const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');
const NameLengthValid = require('../../errors/NameLengthValid');
const ProductAlreadyExists = require('../../errors/ProductAlreadyExists');
const QuantityGreaterThanOrEqualOne = require('../../errors/QuantityGreaterThanOrEqualOne');
const QuantityMustBeANumber = require('../../errors/QuantityMustBeANumber');
const WrongIdFormat = require('../../errors/WrongIdFormat');
const { productAlreadyExists } = require('../../services/productService');

const isValidLength = (str, min, max) => typeof str === 'string'
  && str.length >= min && str.length <= max;

const isValidQuantityGreaterZero = (number, min, max) => typeof number === 'number'
  && number >= min && number <= max;

const isValidName = rescue(async (req, _res, next) => {
  const { name } = req.body;
  const minLength = 5;

  if (!isValidLength(name, minLength, Infinity)) {
    throw new NameLengthValid();
  }

  const productExists = await productAlreadyExists(name);
  if (productExists) {
    throw new ProductAlreadyExists();
  }

  return next();
});

const isValidQuantity = rescue(async (req, res, next) => {
  const { quantity } = req.body;

  const minQty = 1;

  if (typeof quantity === 'string') {
    throw new QuantityMustBeANumber();
  }

  if (!isValidQuantityGreaterZero(quantity, minQty, Infinity)) {
    throw new QuantityGreaterThanOrEqualOne();
  }

  return next();
});

const isValidId = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (typeof id !== 'string' || !ObjectID.isValid(id)) {
    throw new WrongIdFormat();
  }

  return next();
});

module.exports = {
  isValidName,
  isValidQuantity,
  isValidId,
};