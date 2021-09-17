const SalesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const newSale = await SalesModel.create(itensSold);

  return newSale; 
};

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();

  if (!sales) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return { sales };
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        HTTPCode: 404,
        message: 'Sale not found',
      },
    };
  }

  return { sale };
}; 

module.exports = {
  create,
  getAllSales,
  findById,
  // updateOne,
  // eliminate,
};