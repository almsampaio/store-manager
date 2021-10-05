const { ObjectId } = require('mongodb');
const errors = require('../errors/salesErrors');

const validateInsertedData = async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (Number(quantity) <= 0) {
      res.status(422).json(errors.invalidData);
    }
    if (!ObjectId.isValid(productId)) {
      res.status(422).json(errors.invalidData);
    }
    next();
};

module.exports = {
  validateInsertedData,
};