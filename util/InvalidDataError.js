const { StatusCodes } = require('http-status-codes');

class InvalidDataError extends Error {
  constructor(message) {
    super();
    this.name = 'invalid_data';
    this.message = message;
    this.code = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = InvalidDataError;
