module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422)
      .json({ err: {
        code: 'invalid_data',
        message: err.details[0].message },
      });
  }

  if (err.code) {
    res.status(422).json({ error: { message: err.message } });
  }

  console.error(err);
  res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });
};
