const { salesModels } = require('../models');

const registerSalesServices = async (itensSold) => {
  const register = await salesModels.registerSales(itensSold);
  return register;
};

const getAllServices = async () => {
  const getAll = await salesModels.getAllSales();
  return getAll;
};

const getOneService = async (id) => {
  const getOne = await salesModels.getOneSale(id);
  return getOne;
};

module.exports = { registerSalesServices, getAllServices, getOneService };
