const saleModel = require('../models/saleModel');

const create = async (sales) => {
  const sale = await saleModel.create(sales);
  return sale;
};

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
};
