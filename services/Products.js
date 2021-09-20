const ProductsModel = require('../models/Products');
const ERRORS = require('../util/erros');

const create = async (name, quantity) => {
  const exists = await ProductsModel.getByName(name);

  if (name.length <= 5) return ERRORS.FIVE_CHARACTERS_LONG;
  if (quantity <= 0) return ERRORS.LESS_THAN_ZERO;
  if (typeof quantity === 'string') return ERRORS.STRING_QUANTITY;
  if (exists) return ERRORS.PRODUCT_ALREADY_EXISTS;

  const product = await ProductsModel.create(name, quantity);
  return product;
};

module.exports = {
  create,
};
