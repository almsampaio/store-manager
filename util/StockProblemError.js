class StockProblemError extends Error {
  constructor(message) {
    super();
    this.name = 'stock_problem';
    this.message = message;
  }
}

module.exports = StockProblemError;
