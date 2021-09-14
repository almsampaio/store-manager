const salesModels = require('../models/sales');
const salesValid = require('./salesValidations');

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const findById = async (id) => {
  const sale = await salesModels.findById(id);
  return sale;
};

const create = async (salesArray) => {
  const validQuantity = salesValid.validQuantity(salesArray);
  if (validQuantity) return validQuantity;

  const sales = await salesModels.create(salesArray);
  return sales;
};

module.exports = {
  create,
  findById,
  getAll,
};