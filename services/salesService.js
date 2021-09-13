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

const updateSales = async (id, sale) => {
  const [{ productId, quantity }] = sale;
  const errorMessage = await validations.validateSale(productId, quantity);
  if (errorMessage) return { errorMessage };
  await salesModel.updateSale(id, sale);
  const saleUpdated = await salesModel.getSaleById(id);
  return { saleUpdated };
};

module.exports = {
  listSales,
  getById,
  registerSales,
  updateSales,
};
