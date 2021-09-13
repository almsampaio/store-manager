const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class WrongIdFormat extends AppError {
  constructor(
    message = 'Validation: Wrong id format',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.wrongIdFormat,
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

module.exports = WrongIdFormat;