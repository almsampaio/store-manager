const salesModel = require('../models/sales');
const { builtError } = require('./products');

const addNew = async (payload) => {
  const results = await salesModel.salesCrud('addNew', payload);
  return results;
};

const get = async (payload, id) => {
  let operation = 'getAll';
  if (id) operation = 'getById';
  const result = await salesModel.salesCrud(operation, payload);
  return !result.message && (result.sales.length || result.itensSold)
    ? result
    : builtError(404, 'not_found', 'Sale not found');
};

module.exports = {
  addNew,
  get,
};
