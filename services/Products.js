const Products = require('../models/Products');

const findProduct = async (name) => {
  const product = await Products.findProduct(name);
  return product;
};

const getProductById = async (id) => {
  const product = await Products.getProductById(id);
  return product;
};

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const createProduct = async (name, quantity) => {
  const product = await Products.createProduct(name, quantity);

  return product;
};

const editProduct = async (name, quantity, id) => {
  const product = await Products.editProduct(name, quantity, id);

  return product;
};

const deleteProduct = async (id) => {
  const product = await Products.deleteProduct(id);

  return product;
};

module.exports = {
  createProduct,
  findProduct,
  getProductById,
  getAll,
  editProduct,
  deleteProduct,
};
