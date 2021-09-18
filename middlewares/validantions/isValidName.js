const Product = require('../../models/ProductsModels');

const isValidName = (name) => {
  if (name.length < 5) {
    return {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      },
    };
  }
};

const findOneProduct = async (name) => {
  const product = await Product.findProductByName({ name });
  if (product !== null) {
    return {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }
};
module.exports = { isValidName, findOneProduct };