const saleModel = require('../models/saleModel');

const createNewSale = async (anArray) => {
  const result = await saleModel.create(anArray);
  return result;
};

module.exports = {
  createNewSale,
};
