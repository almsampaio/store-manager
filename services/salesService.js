const salesModel = require('../models/salesModel');
const validations = require('./validations');

const listSales = () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    const errorMessage = validations.saleNotFound();
    return { errorMessage };
  }

  return { sale };
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
  getById,
  registerSales,
};
