const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');

const create = async (arraySold) => {
  const validation = await SalesSchema.validate(arraySold);

  if (validation.err) {
    return validation;
  }

  const sales = await SalesModel.create(arraySold);

  return sales;
};

const getAll = async () => SalesModel.getAll();

module.exports = {
  getAll,
  create,
};
