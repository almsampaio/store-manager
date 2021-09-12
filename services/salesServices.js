const salesModel = require('../models/salesModel');

const create = async (sales) => {
  const createdSales = await salesModel.create(sales);
  return createdSales;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
};
