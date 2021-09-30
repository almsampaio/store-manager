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

module.exports = {
  getAll,
  inputSales,
};
