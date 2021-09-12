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
  return createdProduct;
};

const update = async (name, quantity, id) => {
  await productModel.update(name, quantity, id);
  const product = await productModel.getById(id);
  return product;
};

const deleteById = async (id) => {
  const deletedOne = await productModel.deleteById(id);
  return deletedOne;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
