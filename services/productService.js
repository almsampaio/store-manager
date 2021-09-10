const productModel = require('../models/productModel');

const objCreateError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const create = async (product) => {
  const result = await productModel.create(product);

  if (!result) return objCreateError;

  return result;
};

module.exports = { create };
