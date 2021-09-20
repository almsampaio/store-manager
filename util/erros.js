const errors = {
  FIVE_CHARACTERS_LONG: {
    err: {
      message: '"name" length must be at least 5 characters long',
      code: 'invalid_data',
    },
  },

  PRODUCT_ALREADY_EXISTS: {
    err: {
      message: 'Product already exists',
      code: 'invalid_data',
    },
  },

  LESS_THAN_ZERO: {
    err: {
      message: '"quantity" must be larger than or equal to 1',
      code: 'invalid_data',
    },
  },

  STRING_QUANTITY: {
    err: {
      message: '"quantity" must be a number',
      code: 'invalid_data',
    },
  },

  PRODUCT_NOT_EXISTS: {
    err: {
      message: 'Wrong id format',
      code: 'invalid_data',
    },
  },
};

module.exports = errors;
