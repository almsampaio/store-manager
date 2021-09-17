const { registerSaleModel } = require('../models/salesModel');

const createSale = async (items) => {
  const newSales = await registerSaleModel(items);
  return newSales;
};

module.exports = {
  createSale,
};