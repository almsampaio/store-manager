const {
  isString,
  isNumber,
  isLengthLetterThan,
  isLessThan,
} = require('../helpers/helpers');

const five = 5;
const zero = 0;
const code = 'invalid_data';

const productSchema = (name, quantity) => {
  if (isString(name)) {
  return { err: { code, message: '"name" must be a String' } }; 
}
  if (isLengthLetterThan(name, five)) {
  return { err: { code, message: '"name" length must be at least 5 characters long' } }; 
}
  if (isNumber(quantity)) {
  return { err: { code, message: '"quantity" must be a number' } }; 
}
  if (isLessThan(quantity, zero)) {
  return { err: { code, message: '"quantity" must be larger than or equal to 1' } }; 
}
};

module.exports = productSchema;