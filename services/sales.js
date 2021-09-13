const salesModel = require('../models/sales');
const { builtError } = require('./products');

const addNew = async (payload) => {
  const results = await salesModel.addNew(payload);
  return results;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.sales.length
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const getById = async (id) => {
  const result = await salesModel.getById({ id });
  return !result.message && result.itensSold
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const updateOne = async (payload, id) => {
  const result = await salesModel.updateOne(payload, id);
  return result.itensSold
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

const deleteOne = async (id) => {
  const result = await salesModel.deleteOne(id);
  return result.itensSold
    ? result
    : builtError(422, 'invalid_data', 'Wrong sale ID format');
};

module.exports = {
  addNew,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
