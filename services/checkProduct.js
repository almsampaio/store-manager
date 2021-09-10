const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkProduct = (name, quantity) => {
  if (name.length < NAME_LENGTH) return 'error length';
  if (quantity <= INVALID_QUANTITY) return 'error quantity';
  if (typeof quantity !== 'number') return 'type number';
};

module.exports = {
  checkProduct,
};
