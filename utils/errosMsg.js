const messageErro = {
  nameLength: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  nameExist: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  quantityMin: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  quantityNotNumber: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
  wrongIdFormat: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
  wrongProductId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
  saleNoteFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
};

module.exports = messageErro;