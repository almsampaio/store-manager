const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json(
      { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
    );
  }
  return res.status(err.type).json({ err: { code: err.code, message: err.message } });
};

module.exports = errorMiddleware;