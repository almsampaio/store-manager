const Joi = require('joi');
const { builtError } = require('../services/products');

const schemaNewSale = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateNewSale = (req, _res, next) => {
  req.body.forEach((sale) => {
    const check = schemaNewSale.validate(sale);
    if (check.error) {
      return next(builtError(422, 'invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });

    next();
};

module.exports = {
  validateNewSale,
};
