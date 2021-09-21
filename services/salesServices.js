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

module.exports = { 
  create,
  getAll,
  getById,
  update,
};
