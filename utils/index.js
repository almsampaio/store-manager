const { middlewaresProducts } = require('../middlewares');

const createProducts = [middlewaresProducts.checkProductName, 
  middlewaresProducts.checkProductExist,
  middlewaresProducts.checkTypeQuantity,
  middlewaresProducts.checkProductQuantity];

const id = middlewaresProducts.checkId;

const updateProducts = [middlewaresProducts.checkProductName,
  middlewaresProducts.checkProductQuantity, middlewaresProducts.checkTypeQuantity];

module.exports = {
  createProducts,
  id,
  updateProducts,
};
