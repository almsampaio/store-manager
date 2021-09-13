const HTTP_UNPROCESSABLE_STATUS = 422;
const MIN_LENGHT = 0;
const MAX_LENGTH = 5;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string',
      },
    });
  }

  if (name.length <= MAX_LENGTH) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= MIN_LENGHT) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

module.exports = {
  validateName,
  validateQuantity,
};