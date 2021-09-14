const salesModel = require('../models/salesModel');
const validations = require('./validations');

const createSale = async (sale) => {
  const validationInputFormat = validations.formatValidationInputSales(sale);
  if (validationInputFormat) return validationInputFormat;

  const validationQuantity = validations.quantityValidationSales(sale);
  if (validationQuantity) return validationQuantity;

  const validationProductId = await validations.productIdValidationSales(sale);
  if (validationProductId) return validationProductId;

  const validateUpdateProductsQuantitys = await validations
  .validateUpdateProductsQuantitys(sale, 'post');
  if (validateUpdateProductsQuantitys) return validateUpdateProductsQuantitys;

  return salesModel.createSale(sale);
};

module.exports = {
  createSale,
};
