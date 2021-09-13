const errors = {
  nomeLength: '"name" length must be at least 5 characters long',
  quantityLarger: '"quantity" must be larger than or equal to 1',
  quantityNumber: '"quantity" must be a number',
};

const lengthLessThan = (value, length) => (value.length < length);
const valueLessThanOrEqual = (value, length) => (value <= length);
const isString = (value) => (typeof value === 'string');

const validateProduct = (name, quantity) => {
  const code = 'invalid_data';

  switch (true) {
    case lengthLessThan(name, 5): return { code, message: errors.nomeLength };
    case valueLessThanOrEqual(quantity, 0): return { code, message: errors.quantityLarger };
    case isString(quantity): return { code, message: errors.quantityNumber };
    default: return {};
  }
};

module.exports = { validateProduct };
