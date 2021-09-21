const { createSales, getAllSales } = require('../models/Sales');

const errQ = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
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

module.exports = {
  create,
  getAll,
};
