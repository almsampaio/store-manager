const modelProduct = require('../models/products');

const getAll = async () => {
  const productsAll = await modelProduct.getAll();
  return productsAll;
};

const newProduct = async (name, quantity) => {
  const productNew = await modelProduct.newProduct(name, quantity);
  const { ops } = productNew;
  return ops[0];
};

const searchById = async (id) => {
  const searchId = await modelProduct.searchById(id);
  return searchId;
};

module.exports = {
  getAll,
  newProduct,
  searchById,
};
