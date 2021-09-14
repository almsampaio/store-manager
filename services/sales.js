const { createSale } = require('../models/sales');

const insertSales = async (sales) => {
  const salesObject = { itensSold: [] };
  sales.forEach(async (sale) => {
    salesObject.itensSold.push(sale);
  });
  const response = await createSale(salesObject);
  return response;
};

module.exports = { insertSales };