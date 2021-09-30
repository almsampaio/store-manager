const modelSales = require('../models/sales');

// const getAll = async () => {
//   const allSales = await modelSales.getAll();
//   return allSales;
// };

const inputSales = async (salesArray) => {
  const newSale = await modelSales.inputSales(salesArray);
  return newSale;
};

module.exports = {
  // getAll,
  inputSales,
};
