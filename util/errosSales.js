const erros = {
  ERROR_QUANTITY: {
    err: {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data',
    },
  },
  SALE_NOT_FOUND: {
    err: {
      message: 'Sale not found',
      code: 'not_found',
    },
  },
  SALE_ID_FORMAT: {
    err: {
      message: 'Wrong sale ID format',
      code: 'invalid_data',
    },
  },
};

module.exports = erros;
