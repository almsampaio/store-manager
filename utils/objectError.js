const errorCode = 'invalid_data';

const errorName = {
  err: {
    code: errorCode,
    message: '"name" length must be at least 5 characters long',
  },
};

const errorTypeQuantity = {
  err: {
    code: errorCode,
    message: '"quantity" must be a number',
  },
};

const errorQuantity = {
  err: {
    code: errorCode,
    message: '"quantity" must be larger than or equal to 1',
  },
};

const errorAlreadyExists = {
  err: {
    code: errorCode,
    message: 'Product already exists',
  },
};

const errorId = {
  err: errorCode,
  message: 'Wrong id format',
};

module.exports = {
  errorName,
  errorTypeQuantity,
  errorQuantity,
  errorAlreadyExists,
  errorId,
};