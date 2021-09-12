const { ObjectId } = require('bson');

const errors = {
  nameNotString: '"name" must be a string',
  nameLenghtLessTahnFive: '"name" length must be at least 5 characters long',
  quantityNotNumber: '"quantity" must be a number',
  quantityLessThanOne: '"quantity" must be larger than or equal to 1',
  WrongIdFormat: 'Wrong id format',
};
const code = 'invalid_data';

const verifyTypeString = (data) => typeof data === 'string';
const verifyTypeNumber = (data) => typeof data === 'number';
const verifyMinLength = (data, minLength) => data.length < minLength;

const validateName = (name) => {
  switch (true) {
    case !verifyTypeString(name): return { code, message: errors.nameNotString };
    case verifyMinLength(name, 5): return { code, message: errors.nameLenghtLessTahnFive };
    default: return false;
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case !verifyTypeNumber(quantity): return { code, message: errors.quantityNotNumber };
    case quantity < 1: return { code, message: errors.quantityLessThanOne };
    default: return false;
  }
};

const findValueInArrayOfObjects = (array, value, key) => {
  const result = array.find((object) => object[key] === value);
  if (result) return true;
  return false;
};

const validateId = (id) => {
  const idExists = ObjectId.isValid(id);
  if (!idExists) return { code, message: errors.WrongIdFormat };
  return true;
};

module.exports = {
  validateName,
  validateQuantity,
  findValueInArrayOfObjects,
  validateId,
};
