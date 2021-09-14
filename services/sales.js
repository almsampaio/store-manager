const SalesModels = require('../models/sales');
const validation = require('./salesValidations');

const create = async (array) => {
  const validQuantity = validation.validateQuantity(array);
  if (validQuantity) return validQuantity;
  const sales = await SalesModels.create(array);
  return sales.ops[0];
};

const getAll = async () => {
  const allSales = await SalesModels.getAll();
  const sales = allSales.map(({ _id, itensSold }) => ({ _id, itensSold }));
  return {
    sales,
  };
};

const getById = async (id) => {
  const sale = await SalesModels.getById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const { _id, itensSold } = sale;
  return {
    _id,
    itensSold,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};
