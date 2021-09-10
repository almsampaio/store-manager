const { ObjectId } = require('mongodb');

const validateName = (name) => {
  const regex = /^.{5,}$/;
  return regex.test(name);
};

const validateTypeNumber = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const validateId = (id) => (ObjectId.isValid(id));

module.exports = {
  validateName,
  validateTypeNumber,
  validateQuantity,
  validateId,
};
