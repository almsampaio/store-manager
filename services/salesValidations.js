const code = 'invalid_data';

const validateQuantity = (salesArray) => {
  const validQuantity = salesArray.find((sale) => sale.quantity <= 0);
  const validString = salesArray.find((sale) => typeof sale.quantity !== 'number');
  if (validQuantity || validString) {
    return {
      err: {
        code,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
};

module.exports = {
  validateQuantity,
};
