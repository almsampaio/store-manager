const Joi = require('@hapi/joi');

module.exports.createSalesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required().messages({
      'any.required': 'Wrong product ID or invalid quantity',
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.min': 'Wrong product ID or invalid quantity',
      'number.base': 'Wrong product ID or invalid quantity',
      'any.required': 'Wrong product ID or invalid quantity',
    }),
  }),
);