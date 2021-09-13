const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class QuantityMustBeANumber extends AppError {
  constructor(
    message = 'Validation: Quantity must be a number',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.qtyMustBeANumber,
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

module.exports = QuantityMustBeANumber;