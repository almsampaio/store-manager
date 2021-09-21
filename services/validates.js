const validateName = (name) => {
  if (!name || name.length < 5 || typeof name !== 'string') {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } };
  }

  return {
    isValid: true,
  };
};

const validateQuantity = (quantity) => {
  if (quantity < 1 || !quantity) {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } };
  }

  if (typeof quantity !== 'number') {
    return { isValid: false,
      err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    } };
  }

  return {
    isValid: true,
  };
};

const validateData = (data, code, message) => {
  if (!data || data === {} || data === undefined) {
    return { isValid: false,
      err: {
      code,
      message,
    } };
  }

  return true;
};

const salesValidateQuantity = (sales) => {
  if (!sales
    || !sales.every((item) => item.quantity > 0)
    || !sales.some((item) => typeof item.quantity !== 'string')) {
    return { isValid: false,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return true;
};

module.exports = {
  validateName,
  validateQuantity,
  validateData,
  salesValidateQuantity,
};
