const { middlewaresProducts } = require('../middlewares');

const createProducts = [middlewaresProducts.checkProductName,
  middlewaresProducts.checkProductQuantity];

const id = middlewaresProducts.checkId;

module.exports = {
  createProducts,
  id,
};
