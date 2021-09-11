const validate = require('../schemas/ProductShema');
const { findProduct } = require('../services/Products');

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

  const existProduct = await findProduct(name);

  if (existProduct) {
    return res.status(422).json(alreadyExistsError);
  }

  next();
};

module.exports = {
  validateProduct,
};
