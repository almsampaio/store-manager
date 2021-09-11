function nameLengthValidation(name) {
  if (name.length < 5) {
    return {
        err: {
          code: 'invalid_data',
          message: '"name" length must be ate least 5 characters long',
        },
      };
  }
  return false;
}

function quantityValidation(quantity) {
  if (quantity <= 0) {
    return {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
  }
  return false;
}

module.exports = {
  nameLengthValidation,
  quantityValidation,
};
