const productsModel = require('../models/Products');

const validNameLength = (name) => {
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

const isNameExists = async (name) => {
  const products = await productsModel.getAll();
  const productName = products.find((product) => product.name === name);
  if (productName) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
};

const isSmallerOrIqualQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const isNotNumber = (quantity) => {
  if (typeof (quantity) !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
};

module.exports = {
  validNameLength,
  isNameExists,
  isSmallerOrIqualQuantity,
  isNotNumber,
};
