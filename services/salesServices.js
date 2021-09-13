const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createdSales = async (itensSold) => {
  const itIsANumber = await itensSold.every((it) => typeof it.quantity === 'number');
  const greaterThanZero = await itensSold.every((it) => it.quantity > 0);
  const validateId = await itensSold
    .every((it) => productsModel.getProductById(it.productId));

  // console.log(itIsANumber, greaterThanZero, validateId);

  if (!itIsANumber || !greaterThanZero || !validateId) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } };
  }
  const insertedSAles = await salesModel.createSales(itensSold);
  return insertedSAles;
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const salesById = await salesModel.getSalesById(id);
  if (salesById === false || salesById === null) {
    return {
      err: { code: 'not_found', message: 'Sale not found' },
    };
  }

  return salesById;
};

const updateSales = async (id, itensSold) => {
  const checkIdtoUpdate = await getSalesById(id);
  if (checkIdtoUpdate.err) return checkIdtoUpdate;

  const itIsANumber = await itensSold.every((it) => typeof it.quantity === 'number');
  const greaterThanZero = await itensSold.every((it) => it.quantity > 0);
  const validateId = await itensSold
    .every((it) => productsModel.getProductById(it.productId));

  // console.log(itIsANumber, greaterThanZero, validateId);

  if (!itIsANumber || !greaterThanZero || !validateId) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } };
  }
  const updateSale = await salesModel.updateSalesById(id, itensSold);
  return updateSale;
};

module.exports = {
  createdSales,
  getAllSales,
  getSalesById,
  updateSales,
};
