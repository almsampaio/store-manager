const salesModel = require('../models/salesModel');
// const productsService = require('./productsService');
const { validateQuantitySale } = require('../schemas/SaleSchema');

const create = async (sale) => {
  const validationQuantity = validateQuantitySale(sale);
  if (validationQuantity.err) return validationQuantity;
  console.log('service sales');
  return salesModel.create(sale);
};

module.exports = { create };
