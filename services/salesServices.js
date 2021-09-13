const salesModels = require('../models/salesModels');
const productsServices = require('./productsServices');

const verifyProductsId = async (sales) => {
  sales.forEach(async (sale) => {
    const response = await productsServices.getProductById(sale.productId);
    if (response.message) return response;
  });
  return true;
};

const createSale = async (sales) => {
  const response = await verifyProductsId(sales);

  if (response.message) return response;

  const sale = await salesModels.createSale(sales);
  return sale;
};

module.exports = {
  createSale,
};
