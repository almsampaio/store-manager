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

module.exports = { createNewSales };