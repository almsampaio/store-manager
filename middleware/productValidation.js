const validate = require('../schemas/productSchema');

const { env: { STATUS_422_UNPROCESSABLE } } = process;

const productValidate = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = validate.productValidate.validate({ name, quantity });

  if (error) {
    return next({
      err: { code: 'invalid_data', message: error.message },
      statusCode: STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

const idValidate = (req, _res, next) => {
  const { id } = req.params;
  const { error } = validate.idValidate.validate(id);

  if(error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong id format' },
      statusCode: STATUS_422_UNPROCESSABLE,
    });
  }

  next();
};

module.exports = {
  productValidate,
  idValidate,
}
