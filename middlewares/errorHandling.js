function errorMiddleware(err, _req, res, _next) {
  res.status(422).json({ err: {
    code: err.code,
    message: err.message,
  } });
}

module.exports = errorMiddleware;