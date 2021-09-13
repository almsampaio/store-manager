const Sales = require('../models/Sales');

const createSales = async (itensSold) => {
  const soldItems = await Sales.createSales(itensSold);
  return { status: 200, data: soldItems };
};

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  return { status: 200, sales: allSales };
};

const getSalesById = async (id) => {
  const sale = await Sales.getSalesById(id);
  if (!sale) return { status: 404, message: 'Sale not found' };
  return { status: 200, sale };
};

const updateSale = async (id, itensSold) => {
  const sale = await Sales.updateSale(id, itensSold);
  return { status: 200, data: sale };
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSale,
};
