const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;
const HTTP_NOT_FOUND_STATUS = 404;

const CODE_ERROR_400 = 'invalid_data';
const CODE_ERROR_401 = 'stock_problem';
const CODE_ERROR_404 = 'not_found';
const MSG_ERROR_NAME = '"name" length must be at least 5 characters long';
const MSG_ERROR_QTD_NOT_NUMBER = '"quantity" must be a number';
const MSG_ERROR_QTD_NUMBER = '"quantity" must be larger than or equal to 1';
const MSG_ERROR_ALREADY_EXISTS = 'Product already exists';
const MSG_ERROR_ID = 'Wrong id format';
const MSG_ERROR_ID_OR_QTD = 'Wrong product ID or invalid quantity';
const MSG_ERRO_NOT_FOUND = 'Sale not found';
const MSG_ERROR_SALE_ID = 'Wrong sale ID format';
const MSG_ERROR_STOCK = 'Such amount is not permitted to sell';

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

const ERROR_ID_OR_QTD = {
  err: {
  code: CODE_ERROR_400,
  message: MSG_ERROR_ID_OR_QTD,
  },
};

const ERROR_SALE_NOT_FOUND = {
  err: {
  code: CODE_ERROR_404,
  message: MSG_ERRO_NOT_FOUND,
  },
};

const ERROR_SALE_ID = {
  err: {
  code: CODE_ERROR_400,
  message: MSG_ERROR_SALE_ID,
  },
};

const ERROR_STOCK = {
  err: {
  code: CODE_ERROR_401,
  message: MSG_ERROR_STOCK,
  },
};

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_UNPROCESSABLE_STATUS,
  HTTP_NOT_FOUND_STATUS,
  CODE_ERROR_401,
  ERROR_NAME,
  ERROR_QTD_NOT_NUMBER,
  ERROR_QTD_NUMBER,
  ERROR_ALREADY_EXISTS,
  ERROR_ID,
  ERROR_ID_OR_QTD,
  ERROR_SALE_NOT_FOUND,
  ERROR_SALE_ID,
  ERROR_STOCK,
};
