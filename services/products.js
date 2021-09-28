const modelProduct = require('../models/products');

const getAll = async () => {
  const productsAll = await modelProduct.getAll();
  return productsAll;
};

const newProduct = async (name, quantity) => {
  const productNew = modelProduct.newProduct(name, quantity);
  return productNew;
};

const searchById = async (id) => {
  const searchId = modelProduct.searchById(id);
  return searchId;
};

module.exports = {
  getAll,
  newProduct,
  searchById,
};
