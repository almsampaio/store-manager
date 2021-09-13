const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class ProductAlreadyExists extends AppError {
  constructor(
    message = 'Validation: Product already exists',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.productAlreadyExists,
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

module.exports = ProductAlreadyExists;