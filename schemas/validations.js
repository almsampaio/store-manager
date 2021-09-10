const isNotString = (value) => typeof value !== 'string';
const inNotNumber = (value) => typeof value !== 'number';
const isNotGreaterThan = (value, length) => value < length;
const lengthSmallerThan = (value, min) => value.length < min;

const validProductsParams = async (name, quantity) => {
  switch (true) {
    case isNotString(name): return {
      err: { code: 'invalid_data', message: '"name" must be a String' },
    };
    case lengthSmallerThan(name, 5): return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
    case inNotNumber(quantity): return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
    case isNotGreaterThan(quantity, 1): return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
    default: return {};
  }
};

module.exports = {
  validProductsParams,
};
