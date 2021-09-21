const { body, validationResult } = require('express-validator');

const saleValidationRules = () => [
    body('*.productId')
      .isLength({ min: 5 })
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }),
    body('*.quantity')
      .isInt()
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      })
      .isInt({ min: 1 })
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }),
  ];

const UNPROCESSABLE_ENTITY = 422;

const validateSale = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = errors.array().map((err) => ({ err: err.msg }));

  if (errors.isEmpty()) return next();

  return res.status(UNPROCESSABLE_ENTITY).json(extractedErrors[0]);
};

module.exports = { 
  add: [
    saleValidationRules(), 
    validateSale,
  ], 
};