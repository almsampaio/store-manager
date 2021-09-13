const SalesModels = require('../models/sales');
const validation = require('./salesValidations');

const create = async (array) => {
  const validQuantity = validation.validateQuantity(array);
  if (validQuantity) return validQuantity;
  const sales = await SalesModels.create(array);
  return sales.ops[0];
};

module.exports = {
  create,
};
