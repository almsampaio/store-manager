const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const { validateData, salesValidateQuantity } = require('./validates');

const createSales = async (sales) => {
  const validQuantity = salesValidateQuantity(sales);
  if (validQuantity.err) return validQuantity;

  const data = await salesModel.createSales(sales);
  return data;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getByIdSales = async (id) => {
  const sales = await salesModel.getAllSales(id);
  if (!sales || sales.length === 0) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sales;
};

const getUpdateSales = async (id, sales) => {
  const validQuantity = salesValidateQuantity(sales);
  if (validQuantity.err) return validQuantity;

  const sale = await salesModel.getUpdateSales(id, sales);
  if (!sale || sale.length === 0 || !ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const removeSale = async (id) => {
  const sale = await salesModel.removeSale(id);
  const validated = await validateData(sale, 'invalid_data', 'Wrong sale ID format');
  if (validated.err) return validated;

  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
  getUpdateSales,
  removeSale,
};
