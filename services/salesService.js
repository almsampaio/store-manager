const salesModel = require('../models/salesModel');

const createSale = async (productId, quantity) => {
  const createdSale = await salesModel.createSale(productId, quantity);
  return createdSale;
};

module.exports = {
  createSale,
};
