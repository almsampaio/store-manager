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

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (SalesSchema.saleNotFound(sale).err) return SalesSchema.saleNotFound(sale);

  return sale;
};

module.exports = {
  getById,
  getAll,
  create,
};
