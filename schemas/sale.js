const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.string()
    .not().empty()
    .required(),

  quantity: Joi.number()
  .not().empty()
    .integer()
    .min(1)
    .required(),
});
