const Joi = require('joi');

const schemaNewProduct = Joi.object({
  name: Joi.string().min(6),
  quantity: Joi.number().integer().min(1),
});

const validateNewProduct = (req, _res, next) => {
  try {
    schemaNewProduct.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateNewProduct,
};
