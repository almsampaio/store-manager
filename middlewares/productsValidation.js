const {
  StatusCodes: { UNPROCESSABLE_ENTITY },
} = require('http-status-codes');
const checkingIf = require('../validations/joiSchemas');
const productService = require('../services/productService');

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

exports.idExists = async (req, _res, next) => {
  const { id } = req.params;
  const result = await productService.getProductById(id);
  console.log(result);  
  if (!result) {
return next({
      err: { code: 'invalid_data', message: 'Wrong id format' },
      statusCode: UNPROCESSABLE_ENTITY,
    }); 
}
  next();
};
