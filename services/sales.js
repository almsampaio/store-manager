const { salesModels } = require('../models');

const registerSalesServices = async (itensSold) => {
  const register = await salesModels.registerSales(itensSold);
  return register;
};

const getAllServices = async () => {
  const getAll = await salesModels.getAllSales();
  return getAll;
};

const getOneServices = async (id) => {
  const getOne = await salesModels.getOneSale(id);
  return getOne;
};

const updateSaleServices = async (id, itensSold) => {
  const update = await salesModels.updateSale(id, itensSold);
  return update;
};

module.exports = {
  registerSalesServices,
  getAllServices,
  getOneServices,
  updateSaleServices,
};
