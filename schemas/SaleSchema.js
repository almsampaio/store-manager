const errors = {
  wrongId: 'Wrong product ID or invalid quantity',
};

const MIN_QUANTITY_LENGTH = 1;

const validateQuantitySale = (sale) => {
  const isMinQuantity = sale.some(({ quantity }) => quantity < MIN_QUANTITY_LENGTH);
  const isQuantityString = sale.some(({ quantity }) => Number.isNaN(+quantity));

  if (isMinQuantity || isQuantityString) {
    return {
      err: {
        code: 'invalid_data',
        message: errors.wrongId,
      },
    };
  }
  return {};
};

module.exports = { validateQuantitySale };
