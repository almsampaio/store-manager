const MAX_LENGTH = 5;

const productsModel = require('../../model/productsModel');

function lengthIsLowerThenFive(name) {
  return typeof name === 'string' && name.length > MAX_LENGTH;
}

function nameValidation(req, res, next) {
  const { name } = req.body;
  const isValid = lengthIsLowerThenFive(name);
  if (!isValid) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
}

async function productHasExists(req, res, next) {
  const { name } = req.body;

  const product = await productsModel.findOne(name);

  if (product.name && product.quantity) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
}

function quantityMustBeGreaterThenOne(req, res, next) {
  const { quantity } = req.body;

  if (typeof quantity === 'string') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (Number(quantity) < 1) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
}

module.exports = {
  nameValidation,
  productHasExists,
  quantityMustBeGreaterThenOne,
};
