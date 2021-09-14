const saleModel = require('../models/saleModel');

const errorMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' },
  statusCode: 422 };

const createSale = async (productsSold) => {
  const createdSale = await saleModel.create(productsSold);
  return { createdSale };
};

function checkIfSaleIsValid(product) {
  const { quantity } = product;
    return quantity <= 0 || typeof (quantity) !== 'number';
}

const create = (productsSold) => {
  const isInvalid = productsSold.some(checkIfSaleIsValid);
  if (isInvalid) return errorMessage;
  return createSale(productsSold);
};

module.exports = {
  create,
};
