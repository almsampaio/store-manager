const salesModel = require('../models/salesModel');
const schemas = require('../schemas/validationsSchemas');

const errNotFoundJson = { code: 'not_found', message: 'Sale not found' };
const errWrongIdJson = { code: 'invalid_data', message: 'Wrong sale ID format' };

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale || { sale: null }) return { err: errNotFoundJson };

  return { sale };
};

const create = async (itensSold) => {
  const validations = schemas.validateSales(itensSold);
  if (validations.message) return { err: validations };

  const createSales = await salesModel.create(itensSold);

  return { sales: createSales };
};

const update = async (id, itensSold) => {
  const validations = schemas.validateSales(itensSold);
  if (validations.message) return { err: validations };

  const updatesale = await salesModel.update(id, itensSold);
  return { sale: updatesale };
};

const exclude = async (id, itensSold) => {
  const product = await salesModel.exclude(id);

  if (!product) return { err: errWrongIdJson };

  return { id, itensSold };
};

module.exports = { getAll, getById, create, update, exclude };
