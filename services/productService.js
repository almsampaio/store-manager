const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const product = await productModel.create(name, quantity);
  return product;
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const update = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  return product;
};

const exclude = async (id) => {
  await productModel.exclude(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
