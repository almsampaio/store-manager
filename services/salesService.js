const salesModel = require('../model/salesModel');

const errorMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' },
  statusCode: 422,
};

function saleIsValid(product) {
  const { quantity } = product;
    return quantity <= 0 || typeof (quantity) !== 'number';
}

const createSale = async (productsSold) => {
  const createdSale = await salesModel.create(productsSold);
  return { createdSale };
};

const create = (productsSold) => {
  const isInvalid = productsSold.some(saleIsValid);
  if (isInvalid) return errorMessage;
  return createSale(productsSold);
};

module.exports = {
  create,
};