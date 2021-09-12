const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const salesValidate = Joi.array().items(
  Joi.object({
    quantity: Joi.number().min(1).required(),
    productId: Joi.objectId().required(),
  })
);

module.exports = { salesValidate };
