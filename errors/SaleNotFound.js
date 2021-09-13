const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class SaleNotFound extends AppError {
  constructor(
    message = 'Validation: Sale not found',
    err = { err: {
      code: errorsMessages.notFound,
      message: errorsMessages.saleNotFound,
    } },
    codeStatus = StatusCodes.NOT_FOUND,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.codeStatus = codeStatus;
  }
}

module.exports = SaleNotFound;