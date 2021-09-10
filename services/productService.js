const productsModel = require('../models/productsModel');
const { validation } = require('./validations');

const listProducts = async () => {
  const products = await productsModel.getAll();
  return products;
};

const create = async (name, quantity) => {
  const result = await validation(name, quantity);

  if (result) return result;

  const createdProduct = await productsModel.createProduct(name, quantity);
  return { createdProduct };
};

module.exports = {
  create,
  listProducts,
};
