const Products = require('../models/Products');

async function createProduct({ name, quantity }) {
  const product = await Products.createProduct({ name, quantity });

  return product;
}

async function getProducts() {
  const products = await Products.getProducts();

  return products;
}

async function getProductById(id) {
  const product = await Products.getProductById(id);
  return product;
}

async function editProduct(id, name, quantity) {
  const editedProduct = await Products.editProduct(id, name, quantity);
  return editedProduct;
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
};
