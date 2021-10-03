const { HTTP_UNPROCESSABLE_ENTITY } = require('../httpRequests');
const Model = require('../models');
const { objectError } = require('../utils/objectError');

const validateName = (name) => {
  const nameLength = 5;

  return name.length < nameLength;
};

const validateQuantity = (quantity) => quantity >= 1;

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const productAdditional = async (dataProduct) => {
  const { name, quantity } = dataProduct;
  const validateNameMessage = '"name" length must be at least 5 characters long';
  const validateQuantityMessage = '"quantity" must be larger than or equal to 1';
  const validateTypeQuantityMessage = '"quantity" must be a number';

  if (!validateName(name)) {
  return objectError(HTTP_UNPROCESSABLE_ENTITY, 
    'invalid_data', validateNameMessage); 
}

  if (!validateQuantity(quantity)) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 
      'invalid_data', validateQuantityMessage); 
  }

  if (!validateTypeQuantity(quantity)) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 
      'invalid_data', validateTypeQuantityMessage);
}
  return Model.products.productAdditional(dataProduct);
};

module.exports = {
  productAdditional,
};