const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');
const { validateUpdate } = require('../schemas/salesSchemaJoi');

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (SalesSchema.saleNotFound(sale).err) return SalesSchema.saleNotFound(sale);

  return sale;
};

const getAll = async () => SalesModel.getAll();

const create = async (arraySold) => {
  const validation = await SalesSchema.validate(arraySold);

  if (validation.err) {
    return validation;
  }

  const sales = await SalesModel.create(arraySold);

  return sales;
};

const update = async (id, saleNewData) => {
  const { err } = validateUpdate(saleNewData);

  if (err) {
    return {
      err,
    };
  }
  
  const sale = await SalesModel.update(id, saleNewData);
  
  if (!sale) return { err };
  
  return sale;
};

const remove = async (id) => {
  const removedSale = await SalesModel.remove(id);

  const { err } = SalesSchema.validateRemove(removedSale);

  if (err) {
    return { err };
  }

  return removedSale;
};

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};
