const modelSales = require('../models/sales');
const validations = require('./validations');

const getAll = async () => {
  const allSales = await modelSales.getAll();
  return allSales;
};

const inputSales = async (salesArray) => {
  const validSales = await validations.validSales(salesArray);
  
  if (validSales) return validSales;

  await modelSales.updateQuantity(salesArray);
  // console.log(updateSalesArray);

  // if (newQuantity < 0) {
  //   return {
  //     err: { code: 'stock_problem', message: 'Such amount is not permitted to sell ' },
  //   }; 
  
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
  const validSales = await modelSales.searchSale(id);
  if (validSales) {    
    await modelSales.returnStock(id);

    const delSale = await modelSales.deleteSale(id);
    
    return delSale;
  }

  // console.log(returnStock);
  
  if (!validSales) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    }; 
  }
  
  // console.log(delSale);
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
  deleteSale,
};
