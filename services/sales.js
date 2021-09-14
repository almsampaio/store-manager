const salesModels = require('../models/sales');
const salesValid = require('./salesValidations');

const create = async (salesArray) => {
  const validQuantity = salesValid.validQuantity(salesArray);
  if (validQuantity) return validQuantity;

  const sales = await salesModels.create(salesArray);
  return sales;
};

module.exports = {
  create,
};