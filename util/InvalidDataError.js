class InvalidDataError extends Error {
  constructor(message) {
    super();
    this.name = 'invalid_data';
    this.message = message;
  }
}

module.exports = InvalidDataError;
