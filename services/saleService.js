const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  return sale;
};

const deleteById = async (id) => {
  const deletedSale = await salesModel.deleteById(id);
  return deletedSale;
};

const create = async (itensSold) => {
  const saleCreated = await salesModel.create(itensSold);
  return saleCreated;
};

module.exports = { getAll, findById, deleteById, create }; 