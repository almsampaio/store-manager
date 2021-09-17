const { UNPROCESSABLE, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../constants/HTTPCodeErrors');

module.exports = (err, _req, res, _next) => {
  const errorCode = {
    invalid_data: 422,
    not_found: 404,
    stock_problem: 404,
  };
  
  if (err.isJoi) {
    return res
      .status(errorCode.invalid_data)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  const status = errorCode[err.code] || 500;

  if (err) {
    return res
      .status(status)
      .json({ err: { code: err.code, message: err.message } });
  }

  console.log(err);

  res.status(INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor' });
};