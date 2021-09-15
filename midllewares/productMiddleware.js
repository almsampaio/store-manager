const productService = require('../services/productService');

const messageErro = {
  nameLength: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  nameExist: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  quantityMin: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  quantityNotNumber: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
  wrongIdFormat: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const validateName = (name, products) => {
  if (name.length < 5) return messageErro.nameLength;

  const sameName = products.some((p) => p.name === name);

  if (sameName) return messageErro.nameExist;
  return false;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) return messageErro.quantityMin;
  if (typeof quantity === 'string') return messageErro.quantityNotNumber;
  return false;
};

const validate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const products = await productService.getAllProducts();
  const isNameValid = validateName(name, products);
  const isQuantitvalid = validateQuantity(quantity);
  if (!isNameValid && !isQuantitvalid) return next();
  res.status(422).json(isNameValid || isQuantitvalid);
};

module.exports = { validate/* , messageErro */ };
