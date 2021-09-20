const errorMiddleware = (err, _req, res, _next) => {
  const { status, message, code } = err;
  console.log(`ran one error status: ${status} and message: ${message}`);

  return res.status(status).json({ err: { code, message } });
};

module.exports = {
  errorMiddleware,
};
