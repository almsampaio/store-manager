const salesModel = require('../models/salesModel');

const minQuantity = 1;
const errMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const create = async (itensSold) => {
  const [{ quantity }] = itensSold;
  if (quantity < minQuantity) return errMessage;
  if (typeof (quantity) === 'string') return errMessage;
  const solded = await salesModel.create(itensSold);
  return { solded };
};

module.exports = { create };