const validQuantity = (salesArray) => {
  const isSmallerOrIqualQuantity = salesArray.find((sale) => sale.quantity <= 0);

  const isNotNumber = salesArray.find((sale) => typeof sale.quantity !== 'number');

  if (isSmallerOrIqualQuantity || isNotNumber) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
};

module.exports = {
  validQuantity,
};