const salesModel = require('../models/salesModels');
const productModel = require('../models/productModels');

const HTTP_UNPROCESSABLE_ENTITY = 422;
// const HTTP_CREATED = 201;
const HTTP_OK = 200;
const NOT_FOUND = 404;

const ERRO = 'unable to create';
const AMOUNT_NOT_PERMITTED_SELL = 'Such amount is not permitted to sell';

const createSale = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const oldSales = await salesModel.getProductsSold(itensSold);
  const product = await productModel.getById(productId);
  const findQuantity = product.quantity - quantity;
  const result = await salesModel.createSale(itensSold);

  if (oldSales) return { status: HTTP_UNPROCESSABLE_ENTITY, message: ERRO };
  if (findQuantity < 0) {
    return { status: NOT_FOUND, err: AMOUNT_NOT_PERMITTED_SELL };
  }
  await productModel.updateProduct(productId, product.name, findQuantity);

  return { status: HTTP_OK, data: result };
};

module.exports = {
  createSale,
};