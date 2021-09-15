const Sales = require('../models/salesModel');

const getAll = async () => Sales.getAll();

const create = async (sale) => Sales.create(sale);

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
};
