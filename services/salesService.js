const salesModel = require('../models/salesModel');
const validations = require('./validations');

const registerSales = async (sales) => {
  let newProduct = null;

  sales.forEach(({ productId, quantity }) => {
    const checkProduct = validations.validateSale(productId, quantity);
    newProduct = checkProduct.then((prod) => prod);
  });

  const errorMessage = await newProduct;

  if (errorMessage) return { errorMessage };

  const productSales = await salesModel.registerSales(sales);
  return { productSales };
};

module.exports = {
  registerSales,
};
