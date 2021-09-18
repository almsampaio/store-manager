const { registerSaleModel,
  getAllSalesModel, findById, update } = require('../models/salesModel');

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

const updateSaleService = async (id, itensSold) => {
  const updatedSale = await update(id, itensSold);
  return updatedSale;
};
module.exports = {
  createSale,
  getSales,
  getSaleById,
  updateSaleService,
};