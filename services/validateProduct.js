const validateName = (name) => {
  const minimumNameLength = 5;
  
  if (name.length < minimumNameLength) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      } };
  }
};

const validateQuantity = (quantity) => {
  const minimumQuantity = 1;

  if (quantity < minimumQuantity) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      } };
  }

  if (typeof (quantity) === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      } };
  }
};

module.exports = {
  validateName,
  validateQuantity,
};