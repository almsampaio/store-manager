const { StatusCodes } = require('http-status-codes');

class StockProblemError extends Error {
  constructor(message) {
    super();
    this.name = 'stock_problem';
    this.message = message;
    this.code = StatusCodes.NOT_FOUND;
  }
}

module.exports = StockProblemError;
