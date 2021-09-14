const schema = require('../../schemas/product');

const validation = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schema.validate({ name, quantity });

  if (error) return next(error);

  next();
};

module.exports = validation;
