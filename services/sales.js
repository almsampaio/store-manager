const modelSales = require('../models/sales');
const validations = require('./validations');

const getAll = async () => {
  const allSales = await modelSales.getAll();
  return allSales;
};

const inputSales = async (salesArray) => {
  const validSales = await validations.validSales(salesArray);
  if (validSales) return validSales;
  const newSale = await modelSales.inputSales(salesArray);
  return newSale;
};

const searchSale = async (id) => {
  const sale = await modelSales.searchSale(id);
  return sale;
};

const updateSale = async (id, itensSold) => {
  const updateSaleId = await modelSales.updateSale(id, itensSold);
  return updateSaleId,
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
};
