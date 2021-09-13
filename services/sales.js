const salesModel = require('../models/sales');

const create = async (itensSold) => {
  const sale = await salesModel.create(itensSold);
  return sale;
};

const listAll = async () => {
  const listsSales = await salesModel.getAll();
  return listsSales;
};

const findById = async (id) => {
  const findId = await salesModel.findById(id);
  return findId;
};

const editSale = async (id, itensSold) => {
  const edited = await salesModel.editSale(id, itensSold);
  return edited;
};

module.exports = {
  create,
  listAll,
  findById,
  editSale,
};