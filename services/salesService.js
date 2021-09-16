const Sales = require('../models/salesModel');

const getAll = async () => Sales.getAll();

const create = async (sale) => Sales.create(sale);

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const update = async (id, itens) => {
  const sale = await Sales.findById(id);

  if (!sale) {
    return {
      err: {
      code: 'not_found',
      message: 'Sale not found',
      },
    };
  }

  return Sales.update(id, itens);
};

module.exports = {
  getAll,
  create,
  findById,
  update,
};
