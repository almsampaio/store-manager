const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const product = await productModel.createProduct(name, quantity);

  return product;
};

module.exports = {
  create,
};
