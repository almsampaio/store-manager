const errorSchema = require('../schemas/errors');

const productError = (error) => {
  if (error.details[0].type === 'any.required') {
    return errorSchema(422, 'invalid_data', error.details[0].message);
  }
  if (error.details[0].type === 'string.min') {
    return errorSchema(422, 'invalid_data', error.details[0].message);
  }
  if (error.details[0].type === 'number.greater') {
    return errorSchema(422, 'invalid_data', '"quantity" must be larger than or equal to 1');
  }
  if (error.details[0].type === 'number.base') {
    return errorSchema(422, 'invalid_data', error.details[0].message);
  }
  return errorSchema(100, 'informational', 'something went wrong');
};

module.exports = { productError };