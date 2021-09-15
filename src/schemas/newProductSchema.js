const Joi = require('@hapi/joi');

const MIN_LENGTH = 5;

const newProductSchema = Joi.object({
  name: Joi.string().min(MIN_LENGTH).not().empty()
.required(),
  quantity: Joi.number().integer().min(1).not()
.empty()
.required(),
});

module.exports = newProductSchema; 