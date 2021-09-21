// const { addProduct } = require('../models/Products');

const validateProduct = async (name, quantity) => {
  if (name.length < 5) {
    return (
      { err: { status: 422, message: '"name" length must be at least 5 characters long' } }
     );
  }
  if (!quantity || quantity < 0) {
    return (
      { err: { status: 422, message: 'quantity must be larger than or equal to 1' } }
    );
  }
  if (typeof quantity !== 'number') {
    return (
      { err: { status: 422, message: '"quantity" must be a number' } }
    );
  }
};

module.exports = {
  validateProduct,
};
