const salesModel = require('../models/salesModel');
const ProductsModel = require('../models/productModel');

const checkIdSold = async ({ productId }) => {
  if ((await ProductsModel.findOneById(productId)) === null) {
    return null;
  }
  return true;
};

const checkQtySold = ({ quantity }) => {
  if ((!quantity && quantity !== 0) || !Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  return true;
};

const create = async (sales) => {
  const message = 'Wrong product ID or invalid quantity';

  const promise = await sales.map(async (sale) => {
    if ((await checkIdSold(sale)) === null || checkQtySold(sale) === null) {
      return true;
    }
    return false;
  });
  // https://zellwk.com/blog/async-await-in-loops/ onde aprendi a usar funcoes assincronas em loop

  const checkingSales = await Promise.all(promise);

  const checkedSales = checkingSales.some((sale) => sale === true);

  if (checkedSales) {
    return { err: { code: 'invalid_data',
    message } };
  }
  const itensSold = await salesModel.create(sales);
  return itensSold;
};

module.exports = {
  create,
};
