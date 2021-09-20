const salesModel = require('../models/salesModel');

const errorInvalidQuantity = {
  status: 422,
  result: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
};

const validateIdExist = async (productId) => {
  const result = await salesModel.getProductId(productId);
  if (result) return null;
};

const validateQuantityLength = async (quantity) => {
  if (quantity <= 0 || typeof quantity !== 'number') throw errorInvalidQuantity;
};

const addSales = async (sales) => {
  const result = await salesModel.addSales(sales);
  const { productId, quantity } = result.itensSold[0];
  await validateQuantityLength(quantity);
  await validateIdExist(productId);
  return { status: 200, result };
};

module.exports = {
  addSales,
};