const errorMiddleware = (_err, _req, res, _next) => res.status(422).json(
  { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
);

module.exports = errorMiddleware;