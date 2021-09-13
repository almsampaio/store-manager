const productsModel = require('../models/Products');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  getAll,
  findById,
  create,
};
