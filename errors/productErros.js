const errorMid = (err, _req, res) => {
  const { status, code, message} = err;
  res.status(status).json({
      err: { code, message },
  });
};

module.exports = {
    errorMid,
};