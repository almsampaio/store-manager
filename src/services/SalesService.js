const SalesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const newSale = await SalesModel.create(itensSold);

  return newSale; 
};

module.exports = {
  create,
  // getAllProducts,
  // findById,
  // updateOne,
  // eliminate,
};