const { STATUS_UNPROCESSABLE_ENTITY } = require('../utils/status');

const validName = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string' || !name || name.length < 5) {
    return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 0) {
    return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if (typeof quantity !== 'number') {
    return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

module.exports = {
  validName,
  validQuantity,
};
