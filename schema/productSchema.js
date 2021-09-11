const errors = {
  nameNotString: '"name" must be a string',
  nameLenghtLessTahnFive: '"name" length must be at least 5 characters long',
  quantityNotNumber: '"quantity" must be a number',
  quantityLessThanOne: '"quantity" must be larger than or equal to 1',
};

const verifyTypeString = (data) => typeof data === 'string';
const verifyTypeNumber = (data) => typeof data === 'number';
const verifyMinLength = (data, minLength) => data.length < minLength;

const validateName = (name) => {
  const code = 'invalid_data';
  switch (true) {
    case !verifyTypeString(name): return { code, message: errors.nameNotString };
    case verifyMinLength(name, 5): return { code, message: errors.nameLenghtLessTahnFive };
    default: return false;
  }
};

const validateQuantity = (quantity) => {
  const code = 'invalid_data';
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

module.exports = {
  validateName,
  validateQuantity,
  findValueInArrayOfObjects,
};
