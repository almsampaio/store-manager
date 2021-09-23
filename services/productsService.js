const productsModel = require('../models/productsModel');

const add = async (name, quantity) => await productsModel.add(name, quantity)
  .then((data) => data);

const getAll = async () => await productsModel.getAll()
  .then((data) => ({ products: data }));

const getById = async (id) => await productsModel.getById(id)
  .then((data) => data);

module.exports = {
  add,
  getAll,
  getById,
};
