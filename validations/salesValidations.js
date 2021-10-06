const { ObjectId } = require('mongodb');
const errors = require('../errors/salesErrors');

const validateInsertedData = async (req, res, next) => {
  req.body.forEach((sale) => {
    const { productId, quantity } = sale;
    if (typeof quantity !== 'number') {
      res.status(422).json(errors.invalidData);
    } else if (quantity <= 0) {
      res.status(422).json(errors.invalidData);
    } else if (!ObjectId.isValid(productId)) {
      res.status(422).json(errors.invalidData);
    } else {
      next();
    }
  });
};

module.exports = {
  validateInsertedData,
};