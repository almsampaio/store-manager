const joi = require('@hapi/joi');

const validateCreate = (req, res, next) => {
  const { name, quantity } = req.body;

  const schema = joi.object({
    name: joi.string()
    .min(5)
    .required(),

    quantity: joi.number()
      .integer()
      .min(1)
      .required(),
  }).with('name', 'quantity');

  const verification = schema.validate({ name, quantity });

  if (verification.error) next(verification.error);

  next();
};

module.exports = { validateCreate };
