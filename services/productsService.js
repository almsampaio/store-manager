const productsModel = require('../models/productsModel');

const add = async (name, quantity) => productsModel.add(name, quantity)
  .then((data) => data);

const getAll = async () => productsModel.getAll()
  .then((data) => ({ products: data }));

const getById = async (id) => productsModel.getById(id)
  .then((data) => data);

module.exports = {
  add,
  getAll,
  getById,
};
