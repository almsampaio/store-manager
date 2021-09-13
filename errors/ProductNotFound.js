const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class ProductNotFound extends AppError {
  constructor(
    message = 'Validation: Product not found',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.productDontFound,
    } },
    codeStatus = StatusCodes.UNPROCESSABLE_ENTITY,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.codeStatus = codeStatus;
  }
}

module.exports = ProductNotFound;