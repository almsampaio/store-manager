const joi = require('@hapi/joi');

const validateSaleInput = async (req, res, next) => {
  const sale = req.body;

  const schema = joi.array().items(
    joi.object({
      productId: joi.string().required(),
      quantity: joi.number().integer().min(1).required(),
    }).with('productId', 'quantity'),
  );

  const verification = schema.validate(sale);

  if (verification.error) next(verification.error);

  next();
};

module.exports = { validateSaleInput };
