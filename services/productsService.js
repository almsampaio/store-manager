const { ObjectID } = require('mongodb');
const productsModel = require('../models/productsModel');

const listAll = () => {
  const allProducts = productsModel.listAll();
  return allProducts;
};

const registerProduct = (name, quantity) => productsModel.registerProduct(name, Number(quantity));

const getProduct = (name) => productsModel.getProduct(name);

const listProductId = (id) => productsModel.listProductId(ObjectID(id));

const editProduct = (id, name, quantity) => productsModel.editProduct(ObjectID(id), name, quantity);

const deleteProduct = (id) => productsModel.deleteProduct(ObjectID(id));

module.exports = {
  listAll,
  registerProduct,
  getProduct,
  listProductId,
  editProduct,
  deleteProduct,
};
