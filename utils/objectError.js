const objectError = (status, code, message) => ({
    status,
    code,
    message,
    error: true,
  });

module.exports = {
  objectError,
};