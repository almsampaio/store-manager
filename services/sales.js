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
  const validSales = await validations.validSales(itensSold);
  if (validSales && validSales.err.code) return validSales;
  const updateSaleId = await modelSales.updateSale(id, itensSold);
  return updateSaleId;
};

const deleteSale = async (id) => {
  const delSale = await modelSales.deleteSale(id);
  if (!delSale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    }; 
}
  return delSale;
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
  deleteSale,
};
