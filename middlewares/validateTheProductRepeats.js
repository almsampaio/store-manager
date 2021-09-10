const { findOneProduct } = require('./validantions/isValidName');

const validateTheProductRepeats = async (req, res, next) => {
  const { name } = req.body;
  const response = await findOneProduct(name);
  if (response) return res.status(response.status).json(response.error);
  next();
};

module.exports = validateTheProductRepeats;