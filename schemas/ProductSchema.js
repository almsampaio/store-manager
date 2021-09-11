const messageErrors = {
  nameLength: '"name" length must be at least 5 characters long',
  quantityLength: '"quantity" must be larger than or equal to 1',
  quantityNotString: '"quantity" must be a number',
};

const codeErrors = {
  invalidData: 'invalid_data',
};

const nameLength = (name) => name.length < 5;
const nameIsNotString = (name) => typeof name !== 'string';
const quantityLength = (quantity) => quantity.length <= 0;
const quantityIsNotNumber = (quantity) => typeof quantity !== 'number';

const validate = (name, quantity) => {
  switch (true) {
    case nameLength(name) || nameIsNotString(name): return { 
      err: { code: codeErrors.invalidData, message: messageErrors.nameLength } };
    case quantityLength(quantity): return { 
      err: { code: codeErrors.invalidData, message: messageErrors.quantityLength } };
    case quantityIsNotNumber(quantity): return { err: { code: codeErrors.invalidData,
      message: messageErrors.quantityNotString } };
    default: return {};
  }
};

module.exports = {
  nameLength,
  nameIsNotString,
  quantityLength,
  quantityIsNotNumber,
  validate,
};
