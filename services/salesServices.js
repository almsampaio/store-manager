const salesModels = require('../models/salesModels');

const createSale = async (sales) => {
  const sale = await salesModels.createSale(sales);
  return sale;
};

module.exports = {
  createSale,
};
