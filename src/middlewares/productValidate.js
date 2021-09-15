const newProductSchema = require('../schemas/newProductSchema');

const newProductValidate = async (req, _res, next) => {
  const { name, quantity } = req.body;
  
  const { error } = newProductSchema.validate({ name, quantity });

  if (error) return next(error);

  next();
};

module.exports = newProductValidate;