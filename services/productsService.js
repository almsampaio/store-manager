const productsModel = require('../models/productsModel');

const add = async (name, quantity) => productsModel.add(name, quantity);

const getAll = async () => productsModel.getAll()
  .then((data) => ({ products: data }));

const getById = async (id) => productsModel.getById(id);

const update = async (id, name, quantity) => (
  productsModel.update(id, name, quantity)
);

const remove = async (id) => productsModel.remove(id);

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
