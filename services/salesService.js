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

const update = async (id, itensSold) => {
  const productUpdated = await salesModel.update(id, itensSold);
  return {
    response: productUpdated,
    status: 201,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 