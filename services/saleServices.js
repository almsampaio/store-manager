const { registerSaleModel,
  getAllSalesModel, findById } = require('../models/salesModel');

const createSale = async (items) => {
  const newSales = await registerSaleModel(items);
  return newSales;
};

const getSales = async () => {
  const allSales = await getAllSalesModel();
  return allSales;
};

const getSaleById = async (id) => {
  const findSale = await findById(id);
  return findSale;
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
};