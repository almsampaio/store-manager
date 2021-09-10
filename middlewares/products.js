const { productSchema } = require('../schemas/products');
const { productError } = require('../errors/products');

const isValidPayload = (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate({ name, quantity });
  if (error) {
    const response = productError(error);
    return res.status(response.output.statusCode).json(response.output.payload.custom);
  }
  next();
};

module.exports = { isValidPayload };