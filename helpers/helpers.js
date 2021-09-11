const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_BODY_STATUS = 422;
const HTTP_401 = 401;
const HTTP_NOT_FOUND_STATUS = 404;

const isString = (value) => typeof value !== 'string';
const isNumber = (value) => typeof value !== 'number';
const isLengthLetterThan = (value, length) => value.length < length;
const isLessThan = (value, length) => value < length || value === length;

module.exports = {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
  HTTP_401,
  HTTP_NOT_FOUND_STATUS,
  isString,
  isNumber,
  isLengthLetterThan,
  isLessThan,
};
// d