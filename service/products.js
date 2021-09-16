const joi = require('@hapi/joi');
const productModel = require('../model/products');
const util = require('../util');

const validetionId = /[0-9a-z]{24}/;

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

const findProducts = async () => {
  const products = await productModel.findProducts();
  return products;
};

const findProductId = async (id) => {
  if (!validetionId.test(id)) {
    throw util(
      'Wrong id format',
      'invalid_data',
      422,
    );
  }

  const product = await productModel.findProductId(id);

  if (!product) throw util('Wrong id format', 'invalid_data', 422);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    const { message } = error.details[0];
    throw util(message, 'invalid_data', 422);
  }

  const value = await productModel.updateProduct(id, name, quantity);
  return value;
};

const deleteProduct = async (id) => {
  if (!validetionId.test(id)) {
    throw util(
      'Wrong id format',
      'invalid_data',
      422,
    );
  }

  const product = await productModel.findProductId(id);

  if (!product) throw util('Wrong id format', 'invalid_data', 422);

  await productModel.deleteProduct(id);

  return product;
};

module.exports = {
  createProduct,
  findProducts,
  findProductId,
  updateProduct,
  deleteProduct,
};
