const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const checkingIf = require('../validations/joiSchemas');

exports.saleVerifier = (req, _res, next) => {
  const products = req.body;
  const { error } = checkingIf.sale.validate(products);

  if (error) {
    return next({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      statusCode: UNPROCESSABLE_ENTITY,
    });
  }
  next();
};
