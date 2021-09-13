const Sales = require('../models/Sales');

const createSales = async (itensSold) => {
  const soldItems = await Sales.createSales(itensSold);
  return { status: 200, data: soldItems };
};

module.exports = {
  createSales,
};
