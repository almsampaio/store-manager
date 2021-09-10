const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const editProduct = await productModel.update(id, name, quantity);
  return editProduct;
};

const exclude = async (id) => {
  const remove = await productModel.exclude(id);
  return remove;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
