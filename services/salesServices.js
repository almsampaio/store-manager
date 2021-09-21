const SalesModel = require('../models/salesModel');

const create = async (sale) => {
  const newSale = await SalesModel.create(sale);
  return newSale;
};

const getAll = () => SalesModel
  .getAll().then((result) => result);

const getById = (id) => SalesModel
  .getById(id).then((result) => result);

const update = (id, itensSold) => SalesModel
  .update(id, itensSold).then((result) => result);

const exclude = async (id) => {
  const sale = await getById(id);
  if (!sale) return null;
  await SalesModel.exclude(id);
  return sale;
};
module.exports = { 
  create,
  getAll,
  getById,
  update,
  exclude,
};
