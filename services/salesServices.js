const SalesModel = require('../models/salesModel');

const create = async (sale) => {
  const newSale = await SalesModel.create(sale);
  return newSale;
};

module.exports = { 
  create,
};
