const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await Sales.getById(id);
  const message = 'Sale not found';

  if (!sale) return { status: 404, message };
  return { status: 200, data: sale };
};

const create = async (itensSold) => {
  const findSales = await Sales.getByItensSold(itensSold);
  const message = 'erro';

  if (findSales) return { status: 422, message };
  const result = await Sales.create(itensSold);
  return { status: 200, data: result };
};

const update = async (id, itensSold) => {
  const sale = await Sales.update(id, itensSold);

  return { status: 200, data: sale };
};

const remove = async (id) => {
  const product = await Sales.getById(id);
  const message = 'Wrong sale ID format';

  if (!product) return { status: 422, message };
  const result = await Sales.remove(id);
  return { status: 200, data: result };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};