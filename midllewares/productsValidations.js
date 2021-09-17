const productService = require('../services/productService');

const error = {
  errorNameLenght: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  errorNameExist: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  errorQtMin: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  errorQtNotNumber: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
};

const validateName = (name, products) => {
  if (name.length < 5) return error.errorNameLenght;

  const sameName = products.some((p) => p.name === name);

  if (sameName) return error.errorNameExist;
  return false;
};

const validateQt = (quantity) => {
  if (quantity <= 0) return error.errorQtMin;
  if (typeof quantity === 'string') return error.errorQtNotNumber;
  return false;
};

const validate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const products = await productService.getProducts();
  const isNameValid = validateName(name, products);
  const isQuantitvalid = validateQt(quantity);
  if (!isNameValid && !isQuantitvalid) return next();
  res.status(422).json(isQuantitvalid || isNameValid);
};
  module.exports = { validate };
