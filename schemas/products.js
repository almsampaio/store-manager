const Joi = require('joi');

const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;
const ID_LENGTH = 24;

const productSchema = Joi.object({
  name: Joi
    .string()
    .not()
    .empty()
    .required()
    .min(MIN_LENGTH_NAME),
  quantity: Joi
    .number()
    .integer()
    .not()
    .empty()
    .min(MIN_QUANTITY)
    .required(),
});

const productIdSchema = Joi.object({
  id: Joi.string().length(ID_LENGTH).hex().required()
    .error(() => ({ message: 'Wrong id format' })),
});

module.exports = { productSchema, productIdSchema };