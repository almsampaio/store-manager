const Joi = require('@hapi/joi');

const MIN_LENGTH_NAME = 5;
const MIN_LENGTH_QUANTITY = 1;

const productSchema = Joi.object({
  name: Joi.string().not().empty().required().min(MIN_LENGTH_NAME),
  quantity: Joi.number().integer().not().empty().required().min(MIN_LENGTH_QUANTITY),
});

module.exports = productSchema;
