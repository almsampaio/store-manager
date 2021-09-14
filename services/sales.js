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

const deleteId = async (id) => {
  const deleted = await salesModel.deleteId(id);
  return deleted;
};

module.exports = {
  create,
  listAll,
  findById,
  editSale,
  deleteId,
};