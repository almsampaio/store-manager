const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const ProductsModel = require('../models/productModel');

const checkIdSold = async ({ productId }) => {
  if ((await ProductsModel.findOneById(productId)) === null) {
    return null;
  }
  return true;
};

const checkQtySold = ({ quantity }) => {
  if ((!quantity && quantity !== 0) || !Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  return true;
};

const checkData = async (sales) => {
  // https://zellwk.com/blog/async-await-in-loops/ onde aprendi a usar funcoes assincronas em loop
  const promise = await sales.map(async (sale) => {
    if ((await checkIdSold(sale)) === null || checkQtySold(sale) === null) {
      return true;
    }
    return false;
  });

  const checkingSales = await Promise.all(promise);

  const checkedSales = checkingSales.some((sale) => sale === true);
  return checkedSales;
};

const create = async (sales) => {
  const message = 'Wrong product ID or invalid quantity';
  
  const checkedSales = await checkData(sales);

  if (checkedSales) {
    return { err: { code: 'invalid_data',
    message } };
  }
  const itensSold = await salesModel.create(sales);
  return itensSold;
};

const getById = async (_id) => {
  if (!ObjectId.isValid(_id)) return { err: { code: 'not_found', message: 'Sale not found' } };
  return salesModel.getById(_id);
};

const getAll = async () => salesModel.getAll();

const update = async (_id, sales) => {
  if (!ObjectId.isValid(_id)) return { err: { code: 'not_found', message: 'Sale not found' } };
  const message = 'Wrong product ID or invalid quantity';
  const checkedSales = await checkData(sales);
  if (checkedSales) {
    return { err: { code: 'invalid_data',
    message } };
  }
  const updatedItens = await salesModel.update(_id, sales);
  return updatedItens;
};

module.exports = {
  create,
  getById,
  getAll,
  update,
};
