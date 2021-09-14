const { salesModels } = require('../models');

const registerSalesServices = async (itensSold) => {
  const register = await salesModels.registerSales(itensSold);
  return register;
};

module.exports = { registerSalesServices };
