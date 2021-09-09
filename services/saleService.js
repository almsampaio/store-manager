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

const getAll = async () => {
  const getAllSales = await salesModel.getAll();
  return getAllSales;
};

const findById = async (id) => {
  const getSalesById = await salesModel.findById(id);
  if (getSalesById === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return getSalesById;
};

const updateById = async (id, productId, quantity) => {
  const updateSalesById = await salesModel
    .updateById(id, productId, quantity);
  
  if (isLessThan(quantity, zero)) return returned;
  if (isNumber(quantity)) return returned;

  return updateSalesById;
};

const deleteById = async (id) => {
  const deleteSale = await salesModel.deleteById(id);
  if (deleteSale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return deleteSale;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
