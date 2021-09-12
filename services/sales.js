const Joi = require('joi');
const salesModel = require('../models/sales');

const INVALID_DATA = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const validateSales = Joi.array().items(
  Joi.object()
    .keys({
      quantity: Joi.number().integer().min(1).required(),
      productId: Joi.string().length(24).required(),
    })
    .unknown(true),
);

const createSales = async (itensSold) => {
  const { error, value } = validateSales.validate(itensSold);

  if (error) return { error: INVALID_DATA };

  const [result] = await salesModel.createSales(value);

  return { result };
};

module.exports = {
  createSales,
};
