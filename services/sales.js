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

const update = async (id, salesArray) => {
  const validQuantity = salesValid.validQuantity(salesArray);
  if (validQuantity) return validQuantity;

  await salesModels.update(id, salesArray);

  return { _id: id, itensSold: salesArray };
};

module.exports = {
  create,
  findById,
  getAll,
  update,
};