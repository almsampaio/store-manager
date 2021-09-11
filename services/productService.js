const productModel = require('../models/productModel');

const createNewProduct = async ({ name, quantity }) => {
  const newProduct = await productModel.create({ name, quantity });

  return newProduct;
};

module.exports = {
  createNewProduct,
};
