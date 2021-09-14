const httpStatus = require('../utils/httpStatusCodes');
// Source: Renzo Sevilha
// https://github.com/tryber/sd-010-a-store-manager/pull/10

const error = (err, _req, res, _next) => {
  if (err.isJoi) {
    if (err.details[0].message === 'Sale not found') {
      return res.status(httpStatus.notFound)
        .json({ err: { code: 'not_found', message: err.details[0].message } });
    }
    return res.status(httpStatus.invalidData)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  return res.status(err.statusCode).json({ err: { code: err.code, message: err.message } });
};

module.exports = error;