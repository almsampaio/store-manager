const Joi = require('joi');

const NAME_MIN_LENGTH = 5;
const MIN_QUANTITY = 1;

module.exports = Joi.object({
  name: Joi.string()
    .not().empty()
    .min(NAME_MIN_LENGTH)
    .required(),

  quantity: Joi.number()
    .integer()
    .not().empty()
    .min(MIN_QUANTITY)
    .required(),
});
