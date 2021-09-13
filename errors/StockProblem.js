const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class StockProblem extends AppError {
  constructor(
    message = 'Validation: Stock Problem: Such ammount is not permitted to sell',
    err = { err: {
      code: errorsMessages.stockProblem,
      message: errorsMessages.suchAmountIsNotpermittedToSell,
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

module.exports = StockProblem;