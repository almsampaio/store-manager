class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'not_found';
    this.message = message;
  }
}

module.exports = NotFoundError;
