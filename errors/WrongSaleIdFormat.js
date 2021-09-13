const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class WrongSaleIdFormat extends AppError {
  constructor(
    message = 'Validation: Wrong sale ID format',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.wrongSaleIdFormat,
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

module.exports = WrongSaleIdFormat;