const modelSales = require('../models/sales');

const getAll = async () => {
  const allSales = await modelSales.getAll();
  return allSales;
};

const inputSales = async () => {
  const newSale = await modelSales.inputSales();
  return newSale;
};

module.exports = {
  getAll,
  inputSales,
};
