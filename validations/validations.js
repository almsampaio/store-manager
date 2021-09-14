const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaProduct = Joi.object({
  name: Joi.string()
      .min(5)
      .required(),
    quantity: Joi.number()
      .min(1)
      .required(),
});

const schemaSale = Joi.array().items(
  Joi.object({
    quantity: Joi.number().min(1).required(),
    productId: Joi.objectId(),
  }),
);

module.exports = {
  schemaProduct,
  schemaSale,
};
