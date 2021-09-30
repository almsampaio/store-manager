const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object().keys({
  name: Joi.string().min(5).not().empty()
  .required(),
  quantity: Joi.number().min(1).not().empty()
  .required(),
});

module.exports.updateProductSchema = Joi.object().keys({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1),
});
