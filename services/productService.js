const productsModel = require('../models/productsModel');

const createNewProduct = async (name, quantity) => productsModel.create(name, quantity)
  .then(({ ops }) => ops[0]);

 const getProducts = async () => productsModel.getProducts();

 const getProductsById = async (id) => productsModel.getProductsById(id);

module.exports = {
  createNewProduct,
  getProducts,
  getProductsById,
};
