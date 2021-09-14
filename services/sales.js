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

const update = async (id, array) => {
  const validQuantity = validation.validateQuantity(array);
  if (validQuantity) return validQuantity;
  const sale = await SalesModels.update(id, array);
  if (sale) {
    return {
      _id: id,
      itensSold: array,
    };
  }
};

const exclude = async (id) => {
  const fullSale = await SalesModels.getById(id);
  const sale = await SalesModels.exclude(id);
  if (!sale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return fullSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
