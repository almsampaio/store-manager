const {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_UNPROCESSABLE_ENTITY,
} = require('./httpStatusCode');

const ERROR_MONGO = {
  err: {
    code: 'Internal Database Error',
    message: 'Sorry about that, please contact us if you find this, we respond immediatly',
  },
  statusCode: STATUS_INTERNAL_SERVER_ERROR,
};

const ERROR_NAME_LENGTH = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
  statusCode: STATUS_UNPROCESSABLE_ENTITY,
};

const ERROR_PRODUCT_ALREADY_EXISTS = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
  statusCode: STATUS_UNPROCESSABLE_ENTITY,
};

const ERROR_PRODUCT_QUANTITY_GREATER_THAN_0 = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
  statusCode: STATUS_UNPROCESSABLE_ENTITY,
};

const ERROR_PRODUCT_NOT_A_NUMBER = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
  statusCode: STATUS_UNPROCESSABLE_ENTITY,
};

module.exports = {
  ERROR_MONGO,
  ERROR_NAME_LENGTH,
  ERROR_PRODUCT_ALREADY_EXISTS,
  ERROR_PRODUCT_QUANTITY_GREATER_THAN_0,
  ERROR_PRODUCT_NOT_A_NUMBER,
};
