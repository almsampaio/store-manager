const Joi = require('@hapi/joi');

const messageError = 'Wrong product ID or invalid quantity';

module.exports.createSalesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required().messages({
      'any.required': messageError,
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.min': messageError,
      'number.base': messageError,
      'any.required': messageError,
    }),
  }),
);

module.exports.updateSalesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string(),
    quantity: Joi.number().min(1).messages({
      'number.min': messageError,
      'number.base': messageError,
    }),
  }),
);
