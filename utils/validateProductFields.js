const {
  ERROR_NAME_LENGTH,
  ERROR_PRODUCT_ALREADY_EXISTS,
  ERROR_PRODUCT_QUANTITY_GREATER_THAN_0,
  ERROR_PRODUCT_NOT_A_NUMBER,
} = require('../CONSTANTS/Errors');

function validateName(name, hasOtherWithSameName) {
  if (!name || name.length < 5) return ERROR_NAME_LENGTH;
  if (hasOtherWithSameName) return ERROR_PRODUCT_ALREADY_EXISTS;
  return true;
}

function validateQuantity(quantity) {
  if (typeof quantity !== 'number') return ERROR_PRODUCT_NOT_A_NUMBER;
  if (!quantity && quantity !== 0) return ERROR_PRODUCT_QUANTITY_GREATER_THAN_0;
  if (quantity < 1) return ERROR_PRODUCT_QUANTITY_GREATER_THAN_0;
  return true;
}

module.exports = {
  validateName,
  validateQuantity,
};
