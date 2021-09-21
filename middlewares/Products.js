const { body, validationResult } = require('express-validator');

// https://express-validator.github.io/docs/check-api.html
// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

const INVALID_DATA = 'invalid_data';
console.log('Passandoo aqui :D');
const productValidation = () => [
    body('name')
    .isLength({ min: 5 })
    .withMessage({
      code: INVALID_DATA,
      message: '"name" length must be at least 5 characters long',
    }),
  body('quantity')
    .isInt()
    .withMessage({
      code: INVALID_DATA,
      message: '"quantity" must be a number',
    })
    .isInt({ min: 1 })
    .withMessage({
      code: INVALID_DATA,
      message: '"quantity" must be larger than or equal to 1',
    }),
  ];

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = errors.array().map((err) => ({ err: err.msg }));

  if (errors.isEmpty()) return next();

  return res.status(422).json(extractedErrors[0]);
};

module.exports = {
  add: [
  productValidation(),
  validateProduct,
  ],
};