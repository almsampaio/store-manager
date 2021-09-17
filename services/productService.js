const productsModel = require('../models/productsModel');

const createNewProduct = async (name, quantity) => productsModel.create(name, quantity)
  .then(({ ops }) => ops[0]);

 const getProducts = async () => productsModel.getProducts();

module.exports = {
  createNewProduct,
  getProducts,
};
