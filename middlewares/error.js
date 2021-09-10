const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  return res.status(err.code).json({ err: { code: err.code, message: err.message } });
};

module.exports = errorMiddleware;
