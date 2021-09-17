const Joi = require('@hapi/joi');

const errorMessage = 'Wrong product ID or invalid quantity';

const saleSchema = Joi.array().items({
  productId: Joi.string().required().messages({
    'any.required': errorMessage,
  }),
  quantity: Joi.number().integer().min(1).required()
.messages({
    'number.base': errorMessage,
    'number.min': errorMessage,
    'number.integer': errorMessage,
    'array.base': errorMessage,
    'any.unknown': errorMessage,
  }),
});

module.exports = saleSchema;