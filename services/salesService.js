const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const getSalesById = await salesModel.getSaleById(id);
  return getSalesById;
};

module.exports = {
  getAllSales,
  getSaleById,
};
