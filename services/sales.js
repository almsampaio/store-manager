const { salesModels } = require('../models');

const addSales = async (itensSold) => {
  const register = await salesModels.addSales(itensSold);
  return register;
};

const findSales = async () => {
  const sales = await salesModels.findSales();
  return sales;
};

const findSale = async (id) => {
  const sale = await salesModels.findSale(id);
  return sale;
};

const updateSale = async (id, itensSold) => {
  const update = await salesModels.updateSale(id, itensSold);
  return update;
};

const deleteSale = async (id) => {
  const erase = await salesModels.deleteSale(id);
  return erase;
};

module.exports = {
  addSales,
  findSales,
  findSale,
  updateSale,
  deleteSale,
};
