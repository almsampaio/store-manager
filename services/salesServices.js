const salesModels = require('../models/salesModels');

const createSale = async (sales) => {
  const sale = await salesModels.createSale(sales);
  return sale;
};

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModels.getSaleById(id);

  if (!sale) return { code: 'not_found', type: 404, message: 'Sale not found' };

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
