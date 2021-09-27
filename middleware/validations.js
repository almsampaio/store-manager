const status = require('../status');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } });
  }

  if (typeof name !== 'string') {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"name" must be a string',
    } });
  }

  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 0) {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } });
  }

  if (typeof quantity !== 'number') {
    return res.status(status.HTTP_UNPROCESSABLE_ENTITY).json({ err: { 
      code: 'invalid_data',
      message: '"quantity" must be a number',
    } });
  }
  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
};