const { ObjectId } = require('mongodb');

const productIdValidation = (req, _res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return next({ message: 'Wrong id format' });

  next();
};

module.exports = productIdValidation;
