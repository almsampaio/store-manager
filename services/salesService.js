const salesModel = require('../models/SalesModel');

const create = async (itensSold) => {
const sales = await salesModel.create(itensSold);
  return sales;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  console.log('service', sale);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
};
