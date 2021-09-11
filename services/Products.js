const Products = require('../models/Products');

const findProduct = async (name) => {
  const product = await Products.findProduct(name);
  return product;
};

const createProduct = async (name, quantity) => {
  const product = await Products.createProduct(name, quantity);

  return product;
};

module.exports = { createProduct, findProduct };
