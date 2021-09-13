const lessThanFive = () => ({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
    });
const validateQuantity = () => ({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
});

const validateTypeQuantity = () => ({
      err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
});
 
module.exports = { 
  lessThanFive,
  validateQuantity,
  validateTypeQuantity,
 };