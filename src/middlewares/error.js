const { UNPROCESSABLE, INTERNAL_SERVER_ERROR } = require('../constants/HTTPCodeErrors');

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  const status = err.HTTPCode || UNPROCESSABLE;

  if (err) {
    return res
      .status(status)
      .json({ err: { code: err.code, message: err.message } });
  }

  console.log(err);

  // Retornamos o status 500 Internal Server Error, e uma mensagem avisando que houve um erro.
  res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
};