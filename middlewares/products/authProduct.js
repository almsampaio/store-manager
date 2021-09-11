const rescue = require('express-rescue');
const productSchema = require('../../schemas/productSchema');

const authProduct = rescue(async (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate({ name, quantity });

  if (error) return next(error);

  next();
});

module.exports = authProduct;
