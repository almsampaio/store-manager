const ProductModel = require('../models/Product/ProductModel');
const ProductDao = require('../models/Product/ProductDao');
const { findByName } = require('../models/Product/ProductDao');

async function productIsExists(name) {
  const product = await findByName(name);
  return !!product;
}

async function register(name, quantity) {
  const isExists = await productIsExists(name);
  if (isExists) throw new Error('Product already exists');

  const product = new ProductModel(name, quantity);
  return ProductDao.create(product);
}

module.exports = {
  register,
};
