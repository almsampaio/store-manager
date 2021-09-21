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

const listASalesById = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return Sales.findById(id);
};

const updateSales = async (id, data) => {
  const response = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    }),
  ).validate(data);
  console.log('OI', response);
  if (response.error) return null;
  const newSale = await Sales.updateSales(id, data);
  return newSale;
};

module.exports = { createNewSales, listSales, listASalesById, updateSales };