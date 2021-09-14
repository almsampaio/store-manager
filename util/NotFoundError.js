const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'not_found';
    this.message = message;
    this.code = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
