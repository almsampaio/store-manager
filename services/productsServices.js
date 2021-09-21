const productsModels = require('../models/productsModels');

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

const getById = async (id) => {
  const products = await productsModels.getById(id);
  return products;
};

const getByName = async (wantedName) => {
  const products = await productsModels.getByName(wantedName);
  if (!products) { return undefined; }
  return products;
};

const create = async (name, quantity) => {
  const insertedProduct = await productsModels.create(name, quantity);
  return insertedProduct;
};

const update = async (id, name, quantity) => {
  const updatedProduct = await productsModels.update(id, name, quantity);
  return updatedProduct;
};

const remove = async (id) => {
  const removedProduct = await productsModels.remove(id);
  return removedProduct;
};

module.exports = { getAll, getById, getByName, create, update, remove };