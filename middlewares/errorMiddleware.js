const { hasToUpperCase } = require('../utils/checkers');
const httpStatus = require('../utils/http_status');
const { camelToSnake } = require('../utils/parsers');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(httpStatus.invalidData)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  const parsedErrCode = hasToUpperCase(err.code)
    ? camelToSnake(err.code)
    : err.code;

  res
    .status(httpStatus[err.code])
    .json({ err: { code: parsedErrCode, message: err.message } });
};

module.exports = errorMiddleware;
