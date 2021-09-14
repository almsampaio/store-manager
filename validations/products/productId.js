const { ObjectId } = require('mongodb');
const productModel = require('../../models/Products');

const productIdValidation = (req, _res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return next({ message: 'Wrong id format' });

  const productExists = productModel.getById(id);

  if (!productExists) return next({ message: 'Wrong id format' });

  next();
};

module.exports = productIdValidation;
