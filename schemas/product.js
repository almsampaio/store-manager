const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),

  quantity: Joi.number()
    .min(1)
    .integer()
    .required(),
});
