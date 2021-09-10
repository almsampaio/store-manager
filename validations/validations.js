const isNotString = (value) => typeof value !== 'string';
const isNotGreaterThan = (value, length) => value < length;

module.exports = {
  isNotString,
  isNotGreaterThan,
};
