const errorCode = {
  alreadyExists: 409,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 404,
};

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(errorCode.UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  // const status = errorCode[err.code] || 500;

  if (err) {
    return res
      .status(errorCode.UNPROCESSABLE)
      .json({ err: { code: err.code, message: err.message } });
    // res.json({ error: err.error, message: err.message });
  }

  console.log(err);

  // console.error(err);
  // Retornamos o status 500 Internal Server Error, e uma mensagem avisando que houve um erro.
  res.status(500).json({ message: 'Erro interno do servidor' });
};