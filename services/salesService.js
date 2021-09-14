const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const [{ quantity }] = itensSold;
  const minimumQuantity = 1;

  if (quantity < minimumQuantity) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  if (typeof (quantity) === 'string') {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  const sale = await salesModel.create(itensSold);
  return { sale };
};

const getAll = async () => {
  const sales = salesModel.getAll();
  return sales;
};

module.exports = {
  create,
  getAll,
};