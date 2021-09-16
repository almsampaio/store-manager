const modelSales = require('../model/salesModel');

const getSales = async () => {
  const get = await modelSales.getSales();
  return get;
};

const isValidQuantity = (quantity) => {
  const minimumQuantity = 1;
  if (quantity < minimumQuantity || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
     },
   };
  }
  return {};
};

const createSale = async (itensSold) => {
   const { quantity } = itensSold[0];
   // const product = await productModel.getPtoductsById(productId);
   // if (!product) {
    // return {
    //  err: {
    //    code: 'invalid_data',
    //    message: 'Wrong product ID or invalid quantity',
   // },
   // };
  // }
  const ValidQuantity = isValidQuantity(quantity);
  if (ValidQuantity.err) return ValidQuantity;
  const sales = await modelSales.createSale(itensSold);
  return sales;
};

const getIdSales = async (_id) => {
  if (!await modelSales.getIdSales(_id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const findId = await modelSales.getIdSales(_id);
  return findId;
};

module.exports = { createSale, getSales, getIdSales };