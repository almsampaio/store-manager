const { ObjectId } = require('mongodb');
const salesModel = require('../models/Sales');
const ERROR = require('../util/errosSales');

const create = async (sales) => {
  if (
    !sales
    || sales.some((item) => item.quantity <= 0)
    || sales.some((item) => typeof item.quantity === 'string')) return ERROR.ERROR_QUANTITY;

  const list = await salesModel.create(sales);
  return list;
};

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return ERROR.SALE_NOT_FOUND;

  const sales = await salesModel.getById(id);

  if (!sales) return ERROR.SALE_NOT_FOUND;

  return sales;
};

const setById = async (id, sales) => {
  if (!ObjectId.isValid(id)) return ERROR.SALE_NOT_FOUND;
  if (
    sales.some((item) => item.quantity <= 0)
    || sales.some((item) => typeof item.quantity === 'string')
  ) return ERROR.ERROR_QUANTITY;

  const sale = await salesModel.setById(id, sales);

  return sale;
};

const excludeById = async (id) => {
  if (!ObjectId.isValid(id)) return ERROR.SALE_ID_FORMAT;
  const sale = await salesModel.getById(id);
  const data = await salesModel.excludeById(id);

  return { sale, data };
};

module.exports = {
  create,
  getAll,
  getById,
  setById,
  excludeById,
};
