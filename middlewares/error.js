module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json({ error: { message: err.message } });
  }
};
