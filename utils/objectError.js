const errorCode = 'invalid_data';
const errorCodeNotFound = 'not_found';
const errorCodeStock = 'stock_problem';

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

const errorSales = {
  err: {
    code: errorCode,
    message: 'Wrong product ID or invalid quantity',
  },
};

const errorSaleNotFound = {
  err: {
    code: errorCodeNotFound,
    message: 'Sale not found',
  },
};

const errorSaleId = {
  err: {
    code: errorCode,
    message: 'Wrong sale ID format',
  },
};

const errorStock = {
  err: {
    code: errorCodeStock,
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
  errorName,
  errorTypeQuantity,
  errorQuantity,
  errorAlreadyExists,
  errorId,
  errorSales,
  errorSaleNotFound,
  errorSaleId,
  errorStock,
};