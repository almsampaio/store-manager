const { ObjectId } = require('mongodb');

const validateItensSold = (req, res, next) => {
  const [{ quantity }] = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } });
  }
  if (quantity < 1) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    } });
  }
  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ err: {
      code: 'not_found',
      message: 'Sale not found',
    } });
  }
  next();
};

const validateDelId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    } });
  }
  next();
};

module.exports = {
  validateItensSold,
  validateSaleId,
  validateDelId,
};