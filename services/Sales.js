const Sales = require('../models/Sales');

const registerSale = async (products) => {
  const sale = await Sales.registerSale(products);

  return sale;
};

module.exports = { registerSale };
