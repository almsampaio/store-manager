const SalesModel = require('../models/salesModel');

const create = async (itensSold) => {
  console.log(itensSold);
  const newSale = await SalesModel.create(itensSold);

  console.log('ola');

  return newSale;
};

module.exports = {
  create,
  // getAllProducts,
  // findById,
  // updateOne,
  // eliminate,
};