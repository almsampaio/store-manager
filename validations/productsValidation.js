const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const { productExists } = require('../models/productsModel');

const errors = {
  nameLengthInvalid: '"name" length must be at least 5 characters long',
  isNotNumber: '"quantity" must be a number',
  quantLessThanOne: '"quantity" must be larger than or equal to 1',
  alreadyExists: 'Product already exists',
  wrongId: '"Wrong id format"',
};

const checkNameLenght = (name) => name.length <= 5;
const checkQuantity = (quant) => quant <= 0;
const isNumber = (quant) => typeof quant !== 'number';

const isProductValid = (name, quant) => {
switch (true) {
  case checkNameLenght(name): 
    return { code: UNPROCESSABLE_ENTITY, message: errors.nameLengthInvalid };
  case isNumber(quant):
    return { code: UNPROCESSABLE_ENTITY, message: errors.isNotNumber };
  case checkQuantity(quant):
    return { code: UNPROCESSABLE_ENTITY, message: errors.quantLessThanOne };
  default:
    return {};
}
};

const alreadyExists = async (name) => {
  const res = await productExists(name);
  if (res) {
    return { code: UNPROCESSABLE_ENTITY, message: errors.alreadyExists };
  }
  return {};
};

module.exports = { 
  isProductValid,
  alreadyExists,
}; 
