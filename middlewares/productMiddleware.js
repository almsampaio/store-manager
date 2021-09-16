const HTTP_UNPROCESSABLE_ENTITY = 422;
const INVALID_DATA = 'invalid_data';

const NAME_STRING = '"name" must be a string';
const NAME_LENGTH = '"name" length must be at least 5 characters long';
const QUANTITY_LENGTH = '"quantity" must be larger than or equal to 1';
const QUANTITY_MUST_BE_NUMBER = '"quantity" must be a number';

const validName = (req, res, next) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      code: INVALID_DATA,
      message: NAME_STRING,
    });
  }

  if (name.length <= 5) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      code: INVALID_DATA,
      message: NAME_LENGTH,
    });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      code: INVALID_DATA,
      message: QUANTITY_MUST_BE_NUMBER,
    });
  }

  if (quantity <= 0) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      code: INVALID_DATA,
      message: QUANTITY_LENGTH,
    });
  }

  next();
};

module.exports = {
  validName, 
  validQuantity,
};
