const productModel = require('../models/productsModel');

const createProd = async (name, quantity) => productModel.createProd(name, quantity)
  .then(({ ops }) => ops[0]);
const getAllProducts = async () => productModel.getAllProducts();

const findAllProducts = async () => productModel.findAllProducts();

const findOneProduct = async (id) => productModel.findOneProduct(id);

module.exports = { createProd, getAllProducts, findAllProducts, findOneProduct };