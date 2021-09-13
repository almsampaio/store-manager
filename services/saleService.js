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

const updateSale = async (id, itensSold) => {
  console.log('LOG SERVICE', id, itensSold);
  const result = await saleModel.update(id, itensSold);
  
  return result;
};

module.exports = {
  createNewSale,
  getAllSales,
  getSaleById,
  updateSale,
};
