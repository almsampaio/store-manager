const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await Sales.getById(id);
  return { status: 200, data: sale };
};

module.exports = {
  getAll,
  getById,
};