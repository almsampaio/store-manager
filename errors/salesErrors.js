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

module.exports = {
    invalidData,
    notFound,
};