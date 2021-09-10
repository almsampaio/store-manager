const Joi = require('joi');

const schemaNewProduct = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateNewProduct = (req, _res, next) => {
    const check = schemaNewProduct.validate(req.body);

    if (check.error) next(check.error);
    next();
};

module.exports = {
  validateNewProduct,
};
