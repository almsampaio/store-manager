const validateName = (name) => {
  if (name.length > 5
    && typeof name === 'string'
  ) return true;
  return false;
};

const isNumber = (param) => {
  if (typeof param !== 'number') return false;
  return true;
};

const validateQuantity = (quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) return false;
  return true;
};

module.exports = {
  validateName,
  isNumber,
  validateQuantity,
};