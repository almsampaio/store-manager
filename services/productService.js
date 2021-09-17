const productsModel = require('../models/productsModel');

const createNewProduct = async (name, quantity) => productsModel.create(name, quantity)
  .then(({ ops }) => ops[0]);

 const getProducts = async () => productsModel.getProducts();

 const getProductsById = async (id) => productsModel.getProductsById(id);

 const update = async (id, name, quantity) => productsModel.update(id, name, quantity);

 const deleteProduct = async (id) => productsModel.deleteProduct(id);

module.exports = {
  createNewProduct,
  getProducts,
  getProductsById,
  update,
  deleteProduct,
};
