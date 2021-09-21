const { ObjectId } = require('bson');
const Joi = require('joi');
const Sales = require('../models/SalesModels');

const createNewSales = async (data) => {
  const response = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    }),
  ).validate(data);
  if (response.error) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const newSales = await Sales.createNewSales(data);
  return newSales;
};

const listSales = () => Sales.getAllSales();

const listASalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const sale = await Sales.findById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sale;
};

const updateSales = async (id, data) => {
  const response = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    }),
  ).validate(data);
  if (response.error) return null;
  const newSale = await Sales.updateSales(id, data);
  return newSale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  const sale = await Sales.deleteSale(id);
  if (sale === null) {
    return {
      status: 404,
      err: { code: 'not_found', message: 'Sale not found' },
    };
  }
  return sale;
};

module.exports = {
  deleteSale,
  createNewSales,
  listSales,
  listASalesById,
  updateSales,
};