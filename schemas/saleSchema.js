const Joi = require('@hapi/joi');

const LENGTH_ID = 24;
const MIN_LENGTH_QUANTITY = 1;
const ERR_MESSAGE = 'Wrong product ID or invalid quantity';

const saleSchema = Joi.object({
  productId: Joi.string().not().empty().required().length(LENGTH_ID),
  quantity: Joi.number().integer().empty().required().min(MIN_LENGTH_QUANTITY),
}).messages({ 'number.min': ERR_MESSAGE });

module.exports = saleSchema;
