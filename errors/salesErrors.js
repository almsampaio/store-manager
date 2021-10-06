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

module.exports = {
    invalidData,
    invalidID,
    notFound,
};