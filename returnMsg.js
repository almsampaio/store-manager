const duplicatedProductMsg = { err: { err: { code: 'invalid_data',
  message: 'Product already exists' } },
};

const validateNameMsg = { err: { err: { code: 'invalid_data',
  message: '"name" length must be at least 5 characters long' } },
};

const invalidQtdNumberMsg = { err: { err: { code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1' } },
};

const invalidQtdTypeMsg = { err: { err: { code: 'invalid_data',
  message: '"quantity" must be a number' } },
};

const invalidIdFormat = { err: { err: { code: 'invalid_data',
  message: 'Wrong id format' } },
};

module.exports = {
  duplicatedProductMsg,
  validateNameMsg,
  invalidQtdNumberMsg,
  invalidQtdTypeMsg,
  invalidIdFormat,
};