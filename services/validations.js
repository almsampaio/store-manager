const ProductsModel = require('../models/products');

const validateNameLength = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const isAvailable = async (name) => {
  const products = await ProductsModel.getAll();
  const alreadyInUse = products.find((product) => product.name === name);
  if (alreadyInUse) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const canExclude = async (name) => {
  const products = await ProductsModel.getAll();
  const canDelete = products.find((product) => product.name === name);
  if (!canDelete) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return canDelete;
};

const validateQuantity = (quantity) => {
  let message = '';
  if (quantity <= 0) message = '"quantity" must be larger than or equal to 1';
  if (typeof (quantity) !== 'number') message = '"quantity" must be a number';
  if (message !== '') {
    return {
      err: {
        code: 'invalid_data',
        message,
      },
    };
  }
  return false;
};

module.exports = {
  validateNameLength,
  isAvailable,
  validateQuantity,
  canExclude,
};