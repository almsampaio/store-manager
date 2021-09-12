const salesModel = require('../models/sales');

const validateQuantity = () => {

};

const createSales = async (itensSold) => {
  const result = await salesModel.createSales(itensSold);

  return result;
};

module.exports = {
  createSales,
};
