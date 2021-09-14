const joi = require('@hapi/joi');
const productModel = require('../model/products');
const util = require('../util');

const validateProduct = joi.object({
  name: joi.string().min(5),
  quantity: joi.number().integer().min(1),
});

const createProduct = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });
  const searchName = await productModel.findName(name);

  if (error) {
    const { message } = error.details[0];
    throw util(message, 'invalid_data', 422);
  }

  if (searchName) {
    throw util(
      'Product already exists',
      'invalid_data',
      422,
      );
  }

  const value = await productModel.createProduct(name, quantity);
  return value;
};

module.exports = {
  createProduct,
};
