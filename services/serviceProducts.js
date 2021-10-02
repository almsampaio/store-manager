const { validateName, validateQuantity, 
  validateNumber, alreadyExits } = require('./validations');
const { createNewProduct } = require('../models/modelProducts');

const HTTP_CREATED_STATUS = 201;

const create = async (name, quantity) => {
  validateName(name);
  await alreadyExits(name);
  validateQuantity(quantity);
  validateNumber(quantity);

  const result = await createNewProduct(name, quantity);
  return {
    status: HTTP_CREATED_STATUS,
    result,
  };
};

module.exports = {
  create,
};