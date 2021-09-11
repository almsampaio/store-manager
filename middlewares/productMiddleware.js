const productSchema = require('../schema/productSchema');

const HTTP_UNPROCESSABLE_ENTITY = 422;

const validateName = (req, res, next) => {
  const { name } = req.body;
  const isNameValid = productSchema.validateName(name);
  if (isNameValid !== false) {
      return res.res.status(HTTP_UNPROCESSABLE_ENTITY).json({
        err: { code: isNameValid.code, message: isNameValid.message },
      });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const isQuantityValid = productSchema.validateQuantity(quantity);
  if (isQuantityValid) {
    return res.res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: { code: isQuantityValid.code, message: isQuantityValid.message },
    });
  }
  next();
};

module.exports = {
  validateName,
  validateQuantity,
};
