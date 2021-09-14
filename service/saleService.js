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

const update = async (id, sales) => {
  const product = await saleModel.update(id, sales);
  return product;
};

const exclude = async (id) => saleModel.exclude(id);

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
