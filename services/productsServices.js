const productModel = require('../models/productsModel');

const getAll = async () => {
  const AllProducts = await productModel.getAll();
  return AllProducts;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const createdProduct = await productModel.create(name, quantity);
  return createdProduct[0];
};

module.exports = {
  getAll,
  getById,
  create,
};
