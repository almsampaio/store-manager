const { lessThanFive,
  validateQuantity,
  validateTypeQuantity, 
} = require('../Helpers/help');

const productValidate = async (name, quantity) => {
  if (name.length < 5) {
    return lessThanFive(name);
  } 
  if (quantity <= 0) {
    return validateQuantity(quantity);
  }
  if (typeof (quantity) !== 'number') {
    return validateTypeQuantity(quantity);
  }
};

module.exports = { productValidate };