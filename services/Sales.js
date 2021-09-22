const SalesModel = require('../models/Sales');

exports.create = async (salesInfo) => {
  const { ops: [createdSale] } = await SalesModel.create(salesInfo);

  return createdSale;
};

exports.getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

exports.getById = async (id) => {
  const sale = await SalesModel.getById(id);
  
  return sale;
};

exports.update = async (saleId, itensSold) => {
  const updateSale = await SalesModel.update(saleId, itensSold);
  return updateSale;
};

exports.delete = async (saleId) => {
  const deletedSale = await SalesModel.delete(saleId);

  return deletedSale;
};
