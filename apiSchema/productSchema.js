const Joi = require('joi');

module.exports.createProductSchema = Joi.object().keys({
  name: Joi.string().min(5).not().empty()
  .required(),
  quantity: Joi.number().min(1).not().empty()
  .required(),
});
