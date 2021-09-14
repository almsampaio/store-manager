const productsModel = require('../models/productsModel');

const errors = {
  nomeLength: '"name" length must be at least 5 characters long',
  quantityLarger: '"quantity" must be larger than or equal to 1',
  quantityNumber: '"quantity" must be a number',
  invalidIdOrQuantity: 'Wrong product ID or invalid quantity',
};
const code = 'invalid_data';

const lengthLessThan = (value, length) => (value.length < length);
const valueLessThanOrEqual = (value, length) => (value <= length);
const isString = (value) => (typeof value === 'string');

const validateProduct = (name, quantity) => {
  switch (true) {
    case lengthLessThan(name, 5): return { code, message: errors.nomeLength };
    case valueLessThanOrEqual(quantity, 0): return { code, message: errors.quantityLarger };
    case isString(quantity): return { code, message: errors.quantityNumber };
    default: return {};
  }
};

const validateSales = (arraySales) => {
  for (let index = 0; index < arraySales.length; index += 1) {
    const product = arraySales[index];
    const validId = productsModel.getById(product.productId);
    
    if (valueLessThanOrEqual(product.quantity, 0) || isString(product.quantity) || !validId) {
      return { code, message: errors.invalidIdOrQuantity };
    }
  }
  return {};
};

module.exports = { validateProduct, validateSales };
