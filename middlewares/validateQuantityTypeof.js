const { typeOfQuantity } = require('./validantions/isValidQuantity');

const validateQuantityTypeof = (req, res, next) => {
  const { quantity } = req.body;
  const response = typeOfQuantity(quantity);
  if (response) return res.status(response.status).json(response.error);
  next();
};

module.exports = validateQuantityTypeof;