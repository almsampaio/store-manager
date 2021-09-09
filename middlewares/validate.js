const HTTP_VALID_STATUS = 422;

const MIN_NAME_LENGTH = 5;
const MIN_QUANT_ZERO = 0;

const validName = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(HTTP_VALID_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string',
      },
    });
  }
  if (name.length <= MIN_NAME_LENGTH) {
    return res.status(HTTP_VALID_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  next();
};

const validQuantityProducts = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(HTTP_VALID_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= MIN_QUANT_ZERO) {
    return res.status(HTTP_VALID_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

const validQuantitySales = (req, res, next) => {
  let error = null;
  const message = 'Wrong product ID or invalid quantity';

  req.body.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      error = { err: { code: 'invalid_data', message } };
    }
    if (sale.quantity <= MIN_QUANT_ZERO) {
      error = { err: { code: 'invalid_data', message } };
    }
  });
  if (error !== null) return res.status(HTTP_VALID_STATUS).json(error);

  next();
};

module.exports = {
  validName,
  validQuantityProducts,
  validQuantitySales,
};