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

const updateOne = async (id, itenSold) => {
  const updated = await SalesModel.updateOne(id, itenSold);

  return updated;
};

const eliminate = async (id) => {
  const eliminated = await SalesModel.eliminate(id);

  if (!eliminated) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  return { eliminated };
};

module.exports = {
  create,
  getAllSales,
  findById,
  updateOne,
  eliminate,
};