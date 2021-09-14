const Joi = require('joi');

const errorMiddleware = (err, _req, res, _next) => {
  if (Joi.isError(err)) {
    const { message } = err;
    return res.status(422).json({ err: { code: 'invalid_data', message } });
  }
};

module.exports = errorMiddleware;
