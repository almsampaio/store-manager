const ProductsModel = require('../models/ProductsModel');

const errors = {
  NAME_LENGTH: '"name" length must be at least 5 characters long',
  NAME_ALREADY_EXISTS: 'Product already exists',
  QUANTITY_AMOUNT: '"quantity" must be larger than or equal to 1',
  TYPEOF_QUANTITY: '"quantity" must be a number',
  INVALID_PRODUCT: 'Wrong id format',
};
const status = 422;
const code = 'invalid_data';

const isLengthLetterThan = (value, min) => (value.length < min);
const isGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');
const isExist = async (value) => {
  const product = await ProductsModel.findByName(value);
  if (product) return true;
};

const validatePost = async (name, quantity) => {
  switch (true) {
    case isLengthLetterThan(name, 5): return { status, code, message: errors.NAME_LENGTH };
    case (await isExist(name)): return { status, code, message: errors.NAME_ALREADY_EXISTS };
    case isGreaterThan(quantity, 1): return { status, code, message: errors.QUANTITY_AMOUNT };
    case typeOf(quantity): return { status, code, message: errors.TYPEOF_QUANTITY };
    default: return {};
  }
};

const validateGet = async (id) => {
  const product = await ProductsModel.getById(id);  
  if (!product) return { status, code, message: errors.INVALID_PRODUCT };
  return {};
};

const validatePut = (name, quantity) => {
  switch (true) {
    case isLengthLetterThan(name, 5): return { status, code, message: errors.NAME_LENGTH };
    case isGreaterThan(quantity, 1): return { status, code, message: errors.QUANTITY_AMOUNT };
    case typeOf(quantity): return { status, code, message: errors.TYPEOF_QUANTITY };
    default: return {};
  }
};

module.exports = {
  validatePost,
  validateGet,
  validatePut,
};