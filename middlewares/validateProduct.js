const validate = require('../schemas/ProductShema');
const { findProduct, getProductById } = require('../services/Products');

const alreadyExistsError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const { err } = validate(name, quantity);

  if (err) return res.status(422).json({ err });
  const existProductName = await findProduct(name);

  if (existProductName) {
    return res.status(422).json(alreadyExistsError);
  }
  next();
};

const checkProductExists = async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  next();
};

module.exports = {
  validateProduct,
  checkProductExists,
};
