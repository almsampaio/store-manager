const salesModel = require('../models/salesModel');
const schemas = require('../schemas/validationsSchemas');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const create = async (itensSold) => {
  const validations = schemas.validateSales(itensSold);
  if (validations.message) return { err: validations };

  const createSales = await salesModel.create(itensSold);

  return { sales: createSales };
};

module.exports = { getAll, create };
