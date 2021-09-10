const productModel = require('../models/products');

const insertOne = async (name, quantity) => productModel.insertNewProduct(name, quantity);

module.exports = { insertOne };