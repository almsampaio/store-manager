const productsModel = require('../models/productsModel');

const add = async (name, quantity) => productsModel.add(name, quantity)
  .then((data) => data);

const getAll = async () => productsModel.getAll()
  .then((data) => ({ products: data }));

const getById = async (id) => productsModel.getById(id);

const update = async (id, name, quantity) => (
  await productsModel.update(id, name, quantity)
);

module.exports = {
  add,
  getAll,
  getById,
  update
};
