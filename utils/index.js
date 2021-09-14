const { middlewaresProducts, middlewaresServices } = require('../middlewares');

const createProducts = [middlewaresProducts.checkProductName, 
  middlewaresProducts.checkProductExist,
  middlewaresProducts.checkTypeQuantity,
  middlewaresProducts.checkProductQuantity];

const id = middlewaresProducts.checkId;

const updateProducts = [middlewaresProducts.checkProductName,
  middlewaresProducts.checkProductQuantity, middlewaresProducts.checkTypeQuantity];

const quantitySales = [middlewaresServices.checkSalesQuantity,
  middlewaresServices.checkTypeSales];

const idSales = middlewaresServices.checkIdSales;

module.exports = {
  createProducts,
  id,
  updateProducts,
  quantitySales,
  idSales,
};
