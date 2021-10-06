const { ObjectId } = require('mongodb');
const errors = require('../errors/salesErrors');

const validateInsertedData = async (req, res, next) => {
  await req.body.forEach(async (sale) => {
      const { productId, quantity } = sale;
      if (typeof quantity !== 'number') {
        return res.status(422).json(errors.invalidData);
      } if (quantity <= 0) {
        return res.status(422).json(errors.invalidData);
      } if (!ObjectId.isValid(productId)) {
        return res.status(422).json(errors.invalidData);
      }
    });
  next();
};

module.exports = {
  validateInsertedData,
};