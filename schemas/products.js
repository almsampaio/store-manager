const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
  quantity: Joi.number().integer()
    .greater(0)
    .required(),
});
module.exports = { productSchema };