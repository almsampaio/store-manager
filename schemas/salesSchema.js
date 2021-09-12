const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const salesValidate = Joi.array().items({
  productId: Joi.objectId(),
  quantity: Joi.number().min(1).required(),
});

const idValidate = Joi.objectId();

module.exports = {
  salesValidate,
  idValidate,
};
