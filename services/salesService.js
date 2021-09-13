const salesModel = require('../models/salesModel');
const validations = require('./validations');

const createSale = async (sale) => {
  const validationQuantity = validations.quantityValidationSales(sale);
  if (validationQuantity) return validationQuantity;

  const validationProductId = validations.productIdValidationSales(sale);
  if (validationProductId) return validationProductId;

  return salesModel.createSale(sale);
};

module.exports = {
  createSale,
};
