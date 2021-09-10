const { isValidQuantity } = require('./validantions/isValidQuantity');

const validateQuantityLength = (req, res, next) => {
  const { quantity } = req.body;
  const response = isValidQuantity(quantity);
  if (response) return res.status(response.status).json(response.error);
  next();
};

module.exports = validateQuantityLength;