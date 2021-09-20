const salesModels = require('../models/salesModels');

const getAll = async () => {
  try {
    const sales = await salesModels.getAll();
    return sales;
  } catch (error) {
    return ({ message: error.message });
  }
};

const getById = async (id) => {
  try {
  const sales = await salesModels.getById(id);
  return sales;
  } catch (error) {
    return ({ message: error.message });
  }
};

const getByName = async (wantedName) => {
  const products = await salesModels.getByName(wantedName);
  if (!products) { return undefined; }
  return products;
};

const create = async (productsSold) => {
  const insertedProduct = await salesModels.create(productsSold);
  return insertedProduct;
};

const update = async (id, name, quantity) => {
  try {
  const updatedProduct = await salesModels.update(id, name, quantity);
  if (!updatedProduct) { throw new Error('not_found'); }
  return updatedProduct;
  } catch (error) { return ({ err: { message: error.message, code: 404 } }); }
};

const remove = async (id) => {
  try {
  const removedProduct = await salesModels.remove(id);
  return { status: 200, data: removedProduct };
  } catch (error) {
    return ({ status: 422, err: { code: 'invalid_data', message: error.message } });
  }
};

module.exports = { getAll, getById, getByName, create, update, remove };