// const { validate } = require('@hapi/joi/lib/base')
const salesModel = require('../models/saleModel');
// const schema = require('../schemas/productSchema');

const {
  isNumber,
  isLessThan,
} = require('../helpers/helpers');

const zero = 0;
const code = 'invalid_data';
const message = 'Wrong product ID or invalid quantity';
const returned = {
  err: {
    code, 
    message,
  },
};

const create = async (itensSold) => {
  const [{ quantity }] = itensSold;

  if (isLessThan(quantity, zero)) return returned;
    
  if (isNumber(quantity)) return returned;
  
  const saleService = await salesModel.create(itensSold);

  return saleService;
}; 

module.exports = {
  create,
};
