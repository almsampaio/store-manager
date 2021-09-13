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

const updateSale = async (id, newSale) => {
  const update = await salesModels.updateSale(id, newSale);
  return update;
};

const deleteSale = async (id) => {
  const response = await salesModels.deleteSale(id);

  if (!response) return { code: 'invalid_data', type: 422, message: 'Wrong sale ID format' };

  return response;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
