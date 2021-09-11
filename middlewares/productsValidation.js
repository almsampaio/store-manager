const {
  StatusCodes: { UNPROCESSABLE_ENTITY },
} = require('http-status-codes');
const productValidator = require('../validations/joiSchemas');

exports.productVerifier = (req, _res, next) => {
  const { name, quantity } = req.body;
  const { error } = productValidator.schema.validate({ name, quantity });

  if (error) {
    return next({
      err: { code: 'invalid_data', message: error.message },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};
