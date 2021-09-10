const http_status = require('../utils/http_status');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(http_status.invalid_data)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  res
    .status(http_status[err.code])
    .json({ err: { code: err.code, message: err.message } });
};

module.exports = errorMiddleware;
