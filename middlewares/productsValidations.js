const productStringValidation = (value) => typeof value !== 'string';
const productLengthValidation = (value, minimal) => value.length < minimal;
const productQuantTypeValidation = (value) => typeof value !== 'number';
const productQuantCountValidation = (value, length) => value < length;

const productsValidations = async (name, quantity) => {
  switch (true) {
    case productStringValidation(name): return {
      err: { code: 'invalid_data', message: '"name" must be a String' },
    };

    case productLengthValidation(name, 5): return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };

    case productQuantTypeValidation(quantity): return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };

    case productQuantCountValidation(quantity, 1): return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };

    default: return {};
  }
};

module.exports = {
  productsValidations,
};
