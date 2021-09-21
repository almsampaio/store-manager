const { StatusCodes } = require('http-status-codes');
const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  return { status: StatusCodes.OK, data: sales };
};

const getById = async (id) => {
  const sale = await Sales.getById(id);

  if (!sale) {
    return { status: StatusCodes.NOT_FOUND, message: 'Sale not found' };
  }

  return { status: StatusCodes.OK, data: sale };
};

module.exports = {
  getAll,
  getById,
};
