const { ObjectId } = require('mongodb');

const validateName = (name) => {
  const regex = /^.{5,}$/;
  return regex.test(name);
};

const validateTypeNumber = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => {
  const minQuant = 1;
  if (quantity >= minQuant) return true;
};

const validateId = (id) => (ObjectId.isValid(id));

module.exports = {
  validateName,
  validateTypeNumber,
  validateQuantity,
  validateId,
};
