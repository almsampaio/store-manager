const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const getSalesById = await salesModel.getSaleById(id);
  return getSalesById;
};

const minQuantity = 1;

const ERROR_QUANTITY = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const createSale = async (itensSold) => {
  const [{ quantity }] = itensSold;
  if (quantity < minQuantity) return ERROR_QUANTITY;
  if (typeof (quantity) === 'string') return ERROR_QUANTITY;

  const createdSale = await salesModel.createSale(itensSold);
  return { createdSale };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
