module.exports = (err, _req, res, _next) => {
  const NOT_FOUND = 404;

  if (err.err) return res.status(err.err.data.errType).json(err);

  return res.status(NOT_FOUND).json(err);
};
