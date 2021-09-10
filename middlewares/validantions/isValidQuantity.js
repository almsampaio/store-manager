const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      },
    };
  }
};

const typeOfQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      },
    };
  }
};

module.exports = { isValidQuantity, typeOfQuantity };