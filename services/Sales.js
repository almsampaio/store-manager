const { createSales, getAllSales, getSaleById } = require('../models/Sales');

const errQ = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const errSale = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const validyQuantity = (arr) => {
  const validate = arr.find(({ quantity }) => quantity < 1 || typeof quantity === 'string');
  if (validate) return errQ;
  return null;
};

const create = async (arrSales) => {
  const val = await validyQuantity(arrSales);
  if (!val) {
    const createSale = await createSales(arrSales);
    return createSale;
  }
  return val;
};

const getAll = async () => {
  const getSales = await getAllSales();
  return getSales;
};

const getById = async (id) => {
  const getSale = await getSaleById(id);
  if (!getSale) return errSale;
  return getSale;
};

module.exports = {
  create,
  getAll,
  getById,
};
