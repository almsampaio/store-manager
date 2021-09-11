const stringLenght = (string, len) => (string.length < len);

const isString = (string) => (typeof string === 'string');

module.exports = {
  stringLenght,
  isString,
};
