const saleModel = require('../models/saleModel');

const createNewSale = async (anArray) => {
  const result = await saleModel.create(anArray);
  return result;
};

const getAllSales = async () => {
  const result = await saleModel.getAll();
  return result;
};

const getSaleById = async (id) => {
  const result = await saleModel.findById(id);
  return result;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
};
