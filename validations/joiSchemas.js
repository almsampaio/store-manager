const Joi = require('@hapi/joi');

exports.product = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

exports.id = Joi.string().length(24).alphanum().required();