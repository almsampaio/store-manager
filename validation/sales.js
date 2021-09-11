const Joi = require('joi');

const schema = Joi.array().items({
    productId: Joi
      .required(),
    quantity: Joi
      .number()
      .min(1)
      .required(),
  });

module.exports = schema;
