const { productsModels } = require('../models');

const createService = async (name, quantity) => {
  const create = await productsModels.createProduct(name, quantity);
  return create;
};

const findNameService = async (name) => {
  const search = await productsModels.findName(name);
  return search;
};

const getProductsService = async () => {
  const products = await productsModels.getProducts();
  return products;
};

const getProductService = async (id) => {
  const product = await productsModels.getProduct(id);
  return product;
};

module.exports = {
  createService,
  findNameService,
  getProductsService,
  getProductService,
};
