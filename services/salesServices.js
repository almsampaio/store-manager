const salesModels = require('../models/salesModels');

const createSale = async (sales) => {
  const sale = await salesModels.createSale(sales);
  return sale;
};

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

module.exports = {
  createSale,
  getAllSales,
};
