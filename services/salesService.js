const salesModel = require('../models/salesModel');

const validate = (param) => {
  const [{ quantity }] = param;
  const minimumQuantity = 1;

  if (quantity < minimumQuantity) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  if (typeof (quantity) === 'string') {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
};

const create = async (itensSold) => {
  const result = await validate(itensSold);
  if (result) {
    return result;
  }

  const sale = await salesModel.create(itensSold);
  return { sale };
};

const getAll = async () => {
  const sales = salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = salesModel.getById(id);
  return sale;
};

const deleteById = async (id) => {
  const sale = salesModel.deleteById(id);
  return sale;
};

const editById = async (id, itensSold) => {
  const result = await validate(itensSold);
  if (result) {
    return result;
  }

  const sale = await salesModel.editById(id, itensSold);
  console.log(sale);
  return { sale };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  editById,
};