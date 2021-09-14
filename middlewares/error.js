const Joi = require('joi');

const { unprocessableEntity } = require('../utils/httpStatus');

const errorMiddleware = (err, _req, res, _next) => {
  if (Joi.isError(err)) {
    const { message } = err;
    return res.status(unprocessableEntity).json({ err: { code: 'invalid_data', message } });
  }
};

module.exports = errorMiddleware;
