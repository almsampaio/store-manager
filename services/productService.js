const ProductModel = require('../models/productModel');

const productAlreadyExists = async (productName) => {
  const product = await ProductModel.dao()
    .findByName({ name: productName, nameColumn: 'name' });
  return product.length;
};

const existsProductById = async (id) => {
  const product = await ProductModel.dao().findByID(id);
  return product;
};

module.exports = {
  productAlreadyExists,
  existsProductById,
};