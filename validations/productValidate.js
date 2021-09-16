const { lessThanFive,
  validateQuantity,
  validateTypeQuantity, 
} = require('../Helpers/help');

const productValidate = async (name, quantity) => {
  if (name.length < 5) {
    return lessThanFive();
  } 
  if (quantity <= 0) {
    return validateQuantity();
  }
  if (typeof (quantity) !== 'number') {
    return validateTypeQuantity();
  }
};

module.exports = { productValidate };