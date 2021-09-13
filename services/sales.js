const salesModel = require('../models/sales');

const create = async (itensSold) => {
  const sale = await salesModel.create(itensSold);
  return sale;
};

module.exports = {
  create,
};