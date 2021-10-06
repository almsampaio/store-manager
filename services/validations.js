const { productByName } = require('../models/modelProducts');
const { HTTP_UNPROCESSABLE_ENTITY } = require('../httpRequests');
const { objectError } = require('../utils/objectError');

const validateName = (name) => {
  const nameLength = 5;
  const message = '"name" length must be at least 5 characters long';

  if (name.length < nameLength) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
};

const alreadyExists = async (name) => {
  const result = await productByName(name);
  const message = 'Product already exists';

  if (result) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
};

const validateQuantity = (quatity) => {
  const message = '"quantity" must be larger than or equal to 1';

  if (quatity < 1) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
};

const validateNumber = (quantity) => {
  const message = '"quantity" must be a number'; 
  
  if (typeof quantity !== 'number') {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
};

const validateSearch = (result) => {
  const message = 'Wrong id format';

  if (!result) {
    return objectError(HTTP_UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
};

module.exports = {
  validateName,
  alreadyExists,
  validateQuantity,
  validateNumber,
  validateSearch,
};