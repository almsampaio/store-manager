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

const findAll = async () => {
  const products = await productModel.findAll();
  return products;
};
const findById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) {
    return { err: { code: 'invalid_data',
    message: 'Wrong id format' } };
  }
  return product;
};

module.exports = {
  addProduct,
  findAll,
  findById,
};