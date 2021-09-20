const productsModels = require('../models/productsModels');

const getAll = async () => {
  try {
    return { status: 200, data: await productsModels.getAll() };
  } catch (error) { return ({ status: 404, err: { message: error.message } }); } 
};

const getById = async (id) => {
  try {
  const products = await productsModels.getById(id);
  if (!products) { throw new Error('not_found'); }
  return { status: 200, data: await productsModels.getById(id) };
  } catch (error) { return ({ status: 404, err: { message: error.message } }); }
};

const getByName = async (wantedName) => {
  const products = await productsModels.getByName(wantedName);
  if (!products) { return undefined; }
  return products;
};

const create = async (name, quantity) => {
  try {
  const insertedProduct = await productsModels.create(name, quantity);
  if (!insertedProduct) { throw new Error('not_found'); }
  return insertedProduct;
  } catch (error) { return ({ err: { message: error.message, code: 404 } }); }
};

const update = async (id, name, quantity) => {
  try {
  const updatedProduct = await productsModels.update(id, name, quantity);
  if (!updatedProduct) { throw new Error('not_found'); }
  return updatedProduct;
  } catch (error) { return ({ err: { message: error.message, code: 404 } }); }
};

const remove = async (id) => {
  try {
  const removedProduct = await productsModels.remove(id);
  return removedProduct;
  } catch (error) { return ({ err: { message: error.message, code: 404 } }); }
};

module.exports = { getAll, getById, getByName, create, update, remove };