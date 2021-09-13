const salesModel = require('../models/sales');
// const { builtError } = require('./products');

const addNew = async (payload) => {
  const results = await salesModel.salesCrud('addNew', payload);
  return results;
};

module.exports = {
  addNew,
};
