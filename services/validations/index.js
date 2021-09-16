function Validation(condition) {
  this.statusCode = { status: 422, code: 'invalid_data' };
  this.condition = condition;
}

Validation.prototype.newError = function newError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  throw error;
};

Validation.prototype.validate = function validate(message) {
  const { status, code } = this.statusCode;

  if (!this.condition) this.newError(status, code, message);
};

module.exports = Validation;
