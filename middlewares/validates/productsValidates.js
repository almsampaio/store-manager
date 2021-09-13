const {
  HTTP_UNPROCESSABLE_ENTITY,
} = require('../../schemas/status');

const validateNameProducts = (req, res, next) => {
  const { name } = req.body;
  const msg = '"name" length must be at least 5 characters long';

  if (name.length < 5) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: msg,
      },
    });
  }

  next();
};

const validateTypeQuantityProducts = (req, res, next) => {
  const { quantity } = req.body;
  const msg = '"quantity" must be a number';

   if (typeof quantity !== 'number') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: msg,
      },
    });
  }

  next();
};

const validateQuantityProducts = (req, res, next) => {
  const { quantity } = req.body;
  const msg = '"quantity" must be larger than or equal to 1';

  if (quantity <= 0) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: msg,
      },
    });
  }
  next();
};

module.exports = {
  validateNameProducts,
  validateTypeQuantityProducts,
  validateQuantityProducts,
};