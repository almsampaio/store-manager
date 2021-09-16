const salesModel = require('../models/SalesModel');
const productModel = require('../models/productModel');

const create = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const product = await productModel.getById(productId);
  const updateQuantityProduct = product.quantity - quantity;
  await productModel.update(productId, product.name, updateQuantityProduct);
  const sales = await salesModel.create(itensSold);
  return sales;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const update = async (id, productId, quantity) => {
  const sale = await salesModel.update(id, productId, quantity);
  return sale;
};

const exclude = async (id) => {
  await salesModel.exclude(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
