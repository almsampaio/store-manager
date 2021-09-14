const productModel = require('../models/productsModel');

const addProduct = async (name, quantity) => {
  const product = await productModel.findByName(name);
  if (product) {
    return { err: { code: 'invalid_data',
    message: 'Product already exists' } };
  }

  const addedProduct = await productModel.addProduct(name, quantity);
  return addedProduct;
};

module.exports = {
  addProduct,
};