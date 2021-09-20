const Product = require('../models/ProductsModels');

const createNewProduct = async (name, quantity) => Product.createNewProduct(name, quantity);
const listProducts = async () => Product.getProductAll();
const listAProductById = (id) => Product.findById(id);
const updateProduct = (id, name, quantity) => Product.updateProduct(id, name, quantity);
const deleteProduct = (id) => Product.deleteProduct(id);

module.exports = {
  createNewProduct,
  listProducts,
  listAProductById,
  updateProduct,
  deleteProduct,
};
