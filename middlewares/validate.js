const HTTP_VALID_STATUS = 422;

const MIN_NAME_LENGTH = 5;
const MIN_QUANT_ZERO = 0;

const validName = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(HTTP_VALID_STATUS).json({
      mensage: '"name" must be a string',
    });
  }
  if (name.length <= MIN_NAME_LENGTH) {
    return res.status(HTTP_VALID_STATUS).json({
      mensage: '"name" length must be at least 5 characters long',
    });
  }

  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(HTTP_VALID_STATUS).json({
      message: '"quantity" must be a number',
    });
  }
  if (quantity <= MIN_QUANT_ZERO) {
    return res.status(HTTP_VALID_STATUS).json({
      mensage: '"quantity" must be larger than or equal to 1',
    });
  }

  next();
};

module.exports = {
  validName,
  validQuantity,
};