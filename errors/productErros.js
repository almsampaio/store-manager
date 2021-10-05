const errorMid = (err, _req, res) => {
  const { status, code, message } = err;
  res.status(status).json({
      err: { code, message },
  });
};

const wrongId = { err: { 
  code: 'invalid_data',
  message: 'Wrong id format',
} };

const salesWrongData = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

module.exports = {
    errorMid,
    wrongId,
    salesWrongData,
};