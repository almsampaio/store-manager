const salesModel = require('../models/salesModel');
const schemas = require('../schemas/validationsSchemas');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale || { sale: null }) return { err: { code: 'not_found', message: 'Sale not found' } };

  return { sale };
};

const create = async (itensSold) => {
  const validations = schemas.validateSales(itensSold);
  if (validations.message) return { err: validations };

  const createSales = await salesModel.create(itensSold);

  return { sales: createSales };
};

module.exports = { getAll, getById, create };
