const {
  StatusCodes: { UNPROCESSABLE_ENTITY, NOT_FOUND },
} = require('http-status-codes');
const checkingIf = require('../validations/joiSchemas');

exports.saleVerifier = (req, _res, next) => {
  const products = req.body;
  const { error } = checkingIf.sale.validate(products);

  if (error) {
    return next({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};

exports.saleIdCheck = (req, _res, next) => {
  const { id } = req.params;
  const { error } = checkingIf.id.validate(id);
  if (error) {
    return next({
      err: { code: 'not_found', message: 'Sale not found' },
      statusCode: NOT_FOUND,
    });
  }
  next();
};

exports.checkDeletedId = (req, _res, next) => {
  const { id } = req.params;
  const { error } = checkingIf.id.validate(id);
  if (error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};