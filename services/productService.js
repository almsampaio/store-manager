const productModel = require('../models/productModel');

const addProduct = async (name, quantity) => {
  const product = await productModel.addProduct(name, quantity);
  return product;
};

const listProduct = async () => {
  const list = await productModel.listProduct;
  return list;
};

module.exports = {
  addProduct,
  listProduct,
};
