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

const update = async (id, sale) => {
  await salesModel.update(id, sale);
  const updatedItem = await salesModel.getById(id);
  return updatedItem;
};

const deleteById = async (id) => {
  const deletedOne = await salesModel.deleteById(id);
  return deletedOne;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
