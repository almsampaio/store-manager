const Joi = require('joi');

const createProductValidation = (req, _res, next) => {
  const { name, quantity } = req.body;

  const schema = { name, quantity };

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(schema);

  if (error) return next(error);
  
  next();
};

module.exports = {
  createProductValidation,
};
