const salesModel = require('../models/salesModel');

const minimumQuantity = 1;
const minQuantityError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};
const quantityStringError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const getAll = async () => {
  const sales = salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = salesModel.getById(id);
  return sale;
};

const create = async (itensSold) => {
  const [{ quantity }] = itensSold;

  if (quantity < minimumQuantity) return minQuantityError;

  if (typeof (quantity) === 'string') return quantityStringError;

  const sale = await salesModel.create(itensSold);
  return { sale };
};

const editById = async (id, itensSold) => {
  const [{ quantity }] = itensSold;

  if (quantity < minimumQuantity) return minQuantityError;

  if (typeof (quantity) === 'string') return quantityStringError;

  const sale = await salesModel.editById(id, itensSold);
  return { sale };
};

const deleteById = async (id) => {
  const sale = salesModel.deleteById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
