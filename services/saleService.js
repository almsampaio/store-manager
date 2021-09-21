const salesModel = require('../models/salesModel');
const { salesValidateQuantity } = require('./validates');

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

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
};
