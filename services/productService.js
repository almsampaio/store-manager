const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const product = await productModel.create(name, quantity);
  return product;
};

module.exports = {
  create,
};
