const productsModel = require('../models/productsModel');

const findDuplicated = async (name) => {
  const result = await productsModel.getByName(name);
  return result;
};

const validateName = (name) => {
  if (name.length < 5) {
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};

const validateQuantityType = (quantity) => {
  if (typeof quantity !== 'number') return false;
  return true;
};

module.exports = {
  findDuplicated,
  validateName,
  validateQuantity,
  validateQuantityType,
};
