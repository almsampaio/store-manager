const { response } = require('express');
const ProductsModel = require('../models/ProductsModel');

const errors = {
  name_length: '"name" length must be at least 5 characters long',
  name_already_exists: 'Product already exists',
  quantity_amount: '"quantity" must be larger than or equal to 1',
  typeof_quantity: '"quantity" must be number',
  invalid_product: 'Wrong id format',
};

const isLengthLetterThan = (value, min) => (value.length < min);
const isExist = async (value) => {
  const product = await ProductsModel.getAll().findOne(value);
  if (product) return true;
};
const isNumberGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');

const validatePost = (name, quantity) => {
  const code = 'invalid_data';
  switch (true) {
    case isLengthLetterThan(name, 5): return { err: { code, message: errors.name_lenght } };
    case isExist(name): return { err: { code, message: errors.name_already_exists } };
    case isNumberGreaterThan(quantity, 1): return { err: { code, message: errors.quantity_amount } };
    case typeOf(quantity): return { err: { code, message: errors.typeof_quantity } };
    default: return {};
  }
};

const validateGetById = (id) => {
  const code = 'invalid_data';
  const product = await ProductsModel.getById(id);
  if (!product) return { err: { code, message: errors.invalid_product } };
  return {};
};

module.exports = {
  validatePost,
  validateGetById,
};