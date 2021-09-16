const validateQuantity = () => ({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
});
module.exports = { 
  validateQuantity,
 };