const Sales = require('../models/Sales');

async function createSales(sales) {
  const createdSales = await Sales.createSales(sales);
  return createdSales;
}

module.exports = {
  createSales,
};
