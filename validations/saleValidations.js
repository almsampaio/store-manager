const quantityInvalid = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  const status = 422;

const salesValidations = ([{ quantity }]) => {
    if (quantity < 1) return { status, message: quantityInvalid };
    if (typeof quantity === 'string') return { status, message: quantityInvalid };
    return {};
};

module.exports = {
salesValidations,
};