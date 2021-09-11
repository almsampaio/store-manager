const {
  StatusCodes: { UNPROCESSABLE_ENTITY },
} = require('http-status-codes');
const checkingIf = require('../validations/joiSchemas');

exports.productVerifier = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = checkingIf.product.validate({ name, quantity });

  if (error) {
    return next({
      err: { code: 'invalid_data', message: error.message },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};

exports.idValidator = (req, _res, next) => {
  const { id } = req.params;
  const { error } = checkingIf.id.validate(id);

  if (error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong id format' },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};
