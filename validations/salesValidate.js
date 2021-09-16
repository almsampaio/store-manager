const {
  validateQuantity,
} = require('../Helpers/salesHelps');

const salesValidate = async (quantity) => {
  if (quantity <= 0) {
    return validateQuantity();
  }
};

module.exports = { salesValidate };