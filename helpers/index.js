const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;

const CODE_ERROR_400 = 'invalid_data';
const MSG_ERROR_NAME = '"name" length must be at least 5 characters long';
const MSG_ERROR_QTD_NOT_NUMBER = '"quantity" must be a number';
const MSG_ERROR_QTD_NUMBER = '"quantity" must be larger than or equal to 1';
const MSG_ERROR_ALREADY_EXISTS = 'Product already exists';
const MSG_ERROR_ID = 'Wrong id format';

const ERROR_NAME = {
  err: {
    code: CODE_ERROR_400,
    message: MSG_ERROR_NAME,
  },
};

const ERROR_QTD_NOT_NUMBER = {
  err: {
    code: CODE_ERROR_400,
    message: MSG_ERROR_QTD_NOT_NUMBER,
  },
};

const ERROR_QTD_NUMBER = {
  err: {
    code: CODE_ERROR_400,
    message: MSG_ERROR_QTD_NUMBER,
  },
};

const ERROR_ALREADY_EXISTS = {
  err: {
    code: CODE_ERROR_400,
    message: MSG_ERROR_ALREADY_EXISTS,
  },
};

const ERROR_ID = {
  err: {
  code: CODE_ERROR_400,
  message: MSG_ERROR_ID,
  },
};

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_UNPROCESSABLE_STATUS,
  ERROR_NAME,
  ERROR_QTD_NOT_NUMBER,
  ERROR_QTD_NUMBER,
  ERROR_ALREADY_EXISTS,
  ERROR_ID,
};
