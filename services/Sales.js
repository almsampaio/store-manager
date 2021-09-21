const { createSales, getAllSales, getSaleById,
  setSale, deleteProduct } = require('../models/Sales');

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

const wrongId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

const validyQuantity = (arr) => {
  const validate = arr.find(({ quantity }) => quantity < 1 || typeof quantity === 'string');
  if (validate) throw errQ;
  return null;
};

const create = async (arrSales) => {
  try {
    await validyQuantity(arrSales);
    const createSale = await createSales(arrSales);
    return createSale;
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const getSales = await getAllSales();
    return getSales;
  } catch (err) {
    return err;
  }
};

const getById = async (id) => {
  const getSale = await getSaleById(id);
  if (!getSale) return errSale;
  return getSale;
};

const updateSale = async (idSale, itensSold) => {
  try {
    await validyQuantity(itensSold);
    const createSale = await setSale(idSale, itensSold);
    return createSale;
  } catch (err) {
    return err;
  }
};

const deleted = async (idSale) => {
  const getDeletedProduct = await deleteProduct(idSale);
  if (!getDeletedProduct) return wrongId;
  return getDeletedProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  updateSale,
  deleted,
};
