const { isValidName } = require('./validantions/isValidName');

const validateNameLength = (req, res, next) => {
  const { name } = req.body;
  const response = isValidName(name);
  if (response) return res.status(response.status).json(response.error);
  next();
};

module.exports = validateNameLength;