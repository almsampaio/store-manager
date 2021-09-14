const { productsModels } = require('../models');

const addProduct = async (name, quantity) => {
  const create = await productsModels.addProduct(name, quantity);
  return create;
};

const findName = async (name) => {
  const search = await productsModels.findName(name);
  return search;
};

const findProducts = async () => {
  const products = await productsModels.findProducts();
  return products;
};

const findProduct = async (id) => {
  const product = await productsModels.findProduct(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const update = await productsModels.updateProduct(id, name, quantity);
  return update;
};

const deleteProduct = async (id) => {
  const erase = await productsModels.deleteProduct(id);
  return erase;
};

module.exports = {
  addProduct,
  findName,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct,
};
