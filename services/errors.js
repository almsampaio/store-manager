// product errors
const QUANTITY = '"quantity" must be larger than or equal to 1';
const TYPE_NUMBER = '"quantity" must be a number';
const EXISTS = 'Product already exists';
const NAME = '"name" length must be at least 5 characters long';

// sales errors
const S_QUANTITY = 'Wrong product ID or invalid quantity';

module.exports = {
  QUANTITY,
  TYPE_NUMBER,
  EXISTS,
  NAME,
  S_QUANTITY,
};
