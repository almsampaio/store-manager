const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const minimumQuantity = 1;

const quantityError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const stockError = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const getAll = async () => {
  const sales = salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = salesModel.getById(id);
  return sale;
};

const productAvailable = async (productId) => {
  const product = await productsModel.getById(productId);
  return (product.quantity);
};

const create = async (itensSold) => {
  const [{ quantity, productId }] = itensSold;

  const productQty = await productAvailable(productId);
  if (productQty < quantity) return { error: stockError };

  if (quantity < minimumQuantity) return quantityError;

  if (typeof (quantity) === 'string') return quantityError;

  const sale = await salesModel.create(itensSold);
  return { sale };
};

const editById = async (id, itensSold) => {
  const [{ quantity }] = itensSold;

  if (quantity < minimumQuantity) return quantityError;

  if (typeof (quantity) === 'string') return quantityError;

  const sale = await salesModel.editById(id, itensSold);
  return { sale };
};

const deleteById = async (id) => {
  const sale = salesModel.deleteById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
