const STATUS = require('../util/myConst');
const validade = require('../schemas/salesSchema');

const SalesValidate = (req, _res, next) => {
  const { body } = req;
  const { error } = validade.salesValidate.validate(body);

  if(error) {
    return next({
      err: { code: 'invalid_data', message: error.message },
      statusCode: STATUS.STATUS_422_UNPROCESSABLE,
    });
  }

  next();
}

module.exports = {
  SalesValidate,
};
