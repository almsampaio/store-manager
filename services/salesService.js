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

  const salesChecked = await sales
    .some(async (sale) => {
      console.log('1 sale', sale);
      console.log('checkIdSold', await checkIdSold(sale));
      console.log('checkQtySold', checkQtySold(sale));
      return ((await checkIdSold(sale)) === null || checkQtySold(sale) === null);
    });
  console.log('saleschecked', salesChecked);
  if (salesChecked) {
    return { err: { code: 'invalid_data',
    message } };
  }
  const itensSold = await salesModel.create(sales);
  return itensSold;
};

module.exports = {
  create,
};
