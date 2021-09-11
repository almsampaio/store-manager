// const salesController= require('../models/salesController');
const salesModel = require('../models/salesModel');
const validations = require('./validations');

const createSale = async (sale) => {
 const validationQuantity = validations.quantityValidationSales(sale);
  if (validationQuantity) return validationQuantity;

  return salesModel.createSale(sale);
};

module.exports = {
  createSale,
};
