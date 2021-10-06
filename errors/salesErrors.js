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

const notFoundDelete = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
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

const stockProblem = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
    invalidData,
    invalidID,
    notFound,
    outOfStock,
    notFoundDelete,
    stockProblem,
};