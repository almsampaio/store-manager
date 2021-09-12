const salesModel = require('../models/salesModel');
const validations = require('./validations');

const listSales = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const registerSales = async (sales) => {
  let checkProduct = null;

  sales.forEach(({ productId, quantity }) => {
    checkProduct = validations.validateSale(productId, quantity);
  });

  const errorMessage = await checkProduct;

  if (errorMessage) return { errorMessage };

  const productSales = await salesModel.registerSales(sales);
  return { productSales };
};

module.exports = {
  listSales,
  registerSales,
};
