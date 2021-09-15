const ProductSchema = require('../schemas/ProductSchema');

module.exports = (req, _res, next) => {
  const { quantity } = req.body;
  const { error } = ProductSchema.validateQuantity(quantity);
  if (error) next(error);
  next();
};
