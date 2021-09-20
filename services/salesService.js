const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const productAvailable = async (productId) => {
  const product = await productsModel.getById(productId);
  return (product.quantity);
};

const validate = async (itensSold) => {
  const [{ quantity, productId }] = itensSold;
  const minimumQuantity = 1;

  if (quantity < minimumQuantity) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  // Usar Error ao inves de Err para ser pego no 404 e não 422
  const stockError = { 
    err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } };
  const productQty = await productAvailable(productId);
  if (productQty < quantity) {
    return {
      error: stockError };
  }

  if (typeof (quantity) === 'string') {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
};

const create = async (itensSold) => {
  const result = await validate(itensSold);
  if (result) {
    return result;
  }

  const sale = await salesModel.create(itensSold);
  return { sale };
};

const getAll = async () => {
  const sales = salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = salesModel.getById(id);
  return sale;
};

const deleteById = async (id) => {
  const sale = salesModel.deleteById(id);
  return sale;
};

const editById = async (id, itensSold) => {
  const result = await validate(itensSold);
  if (result) {
    return result;
  }

  const sale = await salesModel.editById(id, itensSold);
  console.log(sale);
  return { sale };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  editById,
};