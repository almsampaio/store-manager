// const salesController= require('../models/salesController');
// const salesModel = require('../models/productsModel');
const validations = require('./validations');

const createSale = async (sale) => {
 const validationQuantity = validations.quantityValidationSales(sale);
  if (validationQuantity) return validationQuantity;
};

module.exports = {
  createSale,
};
