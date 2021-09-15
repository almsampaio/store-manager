const productModel = require('../models/productsModel');

const createProd = async (name, quantity) => productModel.createProd(name, quantity)
  .then(({ ops }) => ops[0]);
const getAllProducts = async () => productModel.getAllProducts();

module.exports = { createProd, getAllProducts };