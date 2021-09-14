const salesModel = require('../models/salesModel');

const minQuantity = 1;
const errMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const create = async (itensSold) => {
  const [{ quantity }] = itensSold;
  if (quantity < minQuantity) return errMessage;
  if (typeof (quantity) === 'string') return errMessage;
  const solded = await salesModel.create(itensSold);
  return { solded };
};

const getAllSales = async () => {
  const sales = salesModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = salesModel.getSaleById(id);
  return sale;
};

const editSaleById = async (id, itensSold) => {
  const [{ quantity }] = itensSold;
  if (quantity < minQuantity) return errMessage;
  if (typeof (quantity) === 'string') return errMessage;
  const solded = await salesModel.editSaleById(id, itensSold);
  return { solded };
};

const deleteSaleById = async (id) => {
  const sale = salesModel.deleteSaleById(id);
  return sale;
};

module.exports = {
  create,
  getAllSales,
  getSaleById,
  editSaleById,
  deleteSaleById,
};