const Joi = require('joi');

const schema = Joi.object({
  nome: Joi.string().min(6),
  quantity: Joi.number().integer().min(1),
});

const validateNewProduct = (req, _res, next) => {
  try {
    schema.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateNewProduct,
};
