const ProductModel = require('../models/ProductModel');

new ProductModel().createCounter();

const productAlreadyExists = async (productName) => {
  const product = await new ProductModel()
    .findByName({ name: productName, nameColumn: 'name' });
  return product.length;
};

const existsProductById = async (id) => {
  const product = await new ProductModel().findByID(id);
  return product;
};

module.exports = {
  productAlreadyExists,
  existsProductById,
};