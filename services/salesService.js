const salesModel = require('../models/salesModel');
// const productsService = require('./productsService');
const { validateQuantitySale } = require('../schemas/SaleSchema');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sale;
};

const create = async (sale) => {
  const validationQuantity = validateQuantitySale(sale);
  if (validationQuantity.err) return validationQuantity;
  console.log('service sales');
  return salesModel.create(sale);
};

module.exports = { getAll, getById, create };
