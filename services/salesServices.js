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

module.exports = {
  createdSales,
};
