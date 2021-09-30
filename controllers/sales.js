const serviceSales = require('../services/sales');

const getAll = async (req, res) => {
  const allSales = await serviceSales.getAll();
  return allSales;
};


module.exports = {
  getAll,
  inputSales,
};
