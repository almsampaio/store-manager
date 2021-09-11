const { middlewaresProducts } = require('../middlewares');

const createProducts = [middlewaresProducts.checkProductName,
  middlewaresProducts.checkProductQuantity];

module.exports = { createProducts };
