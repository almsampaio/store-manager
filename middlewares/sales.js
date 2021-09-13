const Joi = require('joi');

const schemaNewSale = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateNewSale = (req, _res, next) => {
    const check = schemaNewSale.validate(req.body);

    if (check.error) next(check.error);
    next();
};

module.exports = {
  validateNewSale,
};
