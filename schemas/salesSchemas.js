const code = 'invalid_data';

const error = {
  isNotIdOrInvalidQuantity: 'Wrong product ID or invalid quantity',
  isNotIdExists: 'Wrong sale ID format',
};

const validQuantity = (salesArray) => {
  const isSmallerOrIqualQuantity = salesArray.find((sale) => sale.quantity <= 0);

  const isNotNumber = salesArray.find((sale) => typeof sale.quantity !== 'number');

  if (isSmallerOrIqualQuantity || isNotNumber) {
    return { err: { code, message: error.isNotIdOrInvalidQuantity } };
  }
};

const invalidQuantity = (salesArray) => {
  const isSmallerOrIqualQuantity = salesArray.find((sale) => sale.quantity <= 0);
  if (isSmallerOrIqualQuantity) {
    return { err: { code, message: error.isNotIdOrInvalidQuantity } };
  }
};

const isNotString = (salesArray) => {
  const isNotNumber = salesArray.find((sale) => typeof sale.quantity !== 'number');

  if (isNotNumber) {
    return { err: { code, message: error.isNotIdOrInvalidQuantity } };
  }
};

const isIdExists = (id) => {
  if (!id) return { err: { code, message: error.isNotIdExists } };
};

module.exports = {
  validQuantity,
  invalidQuantity,
  isNotString,
  isIdExists,
};
