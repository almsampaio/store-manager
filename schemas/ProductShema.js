const code = 'invalid_data';

const errors = {
  invalidNameLength: {
    code,
    message: '"name" length must be at least 5 characters long',
  },
  nameIsNotString: {
    code,
    message: '"name" must be a string',
  },
  lessThanEqualZero: {
    code,
    message: '"quantity" must be larger than or equal to 1',
  },
  quantityIsNotNumber: {
    code,
    message: '"quantity" must be a number',
  },
};

const invalidNameLength = (name) => (name.length < 5);
const nameIsNotString = (name) => (typeof name !== 'string');
const lessThanEqualZero = (quantity) => (quantity <= 0);
const quantityIsNotNumber = (quantity) => (typeof quantity !== 'number');

const validate = (name, quantity) => {
  switch (true) {
    case invalidNameLength(name):
      return { err: errors.invalidNameLength };
    case nameIsNotString(name):
      return { err: errors.nameIsNotString };
    case lessThanEqualZero(quantity):
      return { err: errors.lessThanEqualZero };
    case quantityIsNotNumber(quantity):
      return { err: errors.quantityIsNotNumber };
    default:
      return { name: name.length, quantity };
  }
};

module.exports = validate;
