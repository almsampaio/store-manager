const salesModel = require('../models/SalesModel');
const productModel = require('../models/ProductsModel');

const HTTP_OK_STATUS = 200;
const HTTP_UNPROCESSABLE_STATUS = 422;
const HTTP_NOT_FOUND = 404;

const createSale = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const oldSales = await salesModel.getProductsSold(itensSold);
  const product = await productModel.getById(productId);
  const findQuantity = product.quantity - quantity;
  const result = await salesModel.createSale(itensSold);

  if (oldSales) return { status: HTTP_UNPROCESSABLE_STATUS, message: 'erro' };

  if (findQuantity < 0) {
    return { status: HTTP_NOT_FOUND, err: 'Such amount is not permitted to sell' };
  }

  await productModel.updateProduct(productId, product.name, findQuantity);

  return { status: HTTP_OK_STATUS, data: result };
};

module.exports = {
  createSale,
};
