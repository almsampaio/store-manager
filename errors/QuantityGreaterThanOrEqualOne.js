const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class QuantityGreaterThanOrEqualOne extends AppError {
  constructor(
    message = 'Validation: Quantity >= 1',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.qtyGTEOne,
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

module.exports = QuantityGreaterThanOrEqualOne;