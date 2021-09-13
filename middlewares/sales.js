const Joi = require('joi');

const schemaNewProduct = Joi.object({
});

const validateNewProduct = (req, _res, next) => {
    const check = schemaNewProduct.validate(req.body);

    if (check.error) next(check.error);
    next();
};

module.exports = {
  validateNewProduct,
};
