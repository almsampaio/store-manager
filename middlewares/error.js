module.exports = async (error, _req, res, _next) => {
  const { statusCode, err } = error;
  res.status(statusCode).json({ err });
};
