const invalidData = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
};

const notFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const invalidID = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID',
  },
};

const outOfStock = {
  err: {
    code: 'out_of_stock',
    message: 'Can\'t made a sale when quantity is zero',
  },
};

module.exports = {
    invalidData,
    invalidID,
    notFound,
    outOfStock,
};