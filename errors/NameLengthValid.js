const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class NameLengthValid extends AppError {
  constructor(
    message = 'Validation: Name length >= 5',
    err = { err: {
      code: errorsMessages.code,
      message: errorsMessages.nameLengthGT,
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

module.exports = NameLengthValid;