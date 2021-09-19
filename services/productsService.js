const db = require('../models/productsModel');

const doesItAlreadyExist = async (name) => {
  const alreadyExists = await db.findByName(name);
    if (alreadyExists) {
      return ({
        err: {
          code: 'invalid_data', message: 'Product already exists', 
        },
      }); 
    }
  return true;
};

const isValidName = async (name) => {
  const valid = await doesItAlreadyExist(name);
  switch (true) {
    case typeof (name) !== 'string':
      return { err: { code: 400, message: 'name is not valid.' } };
    case name.length <= 5:
      return { err: { code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' } };
    default:
      return valid;
  }
};

const isValidQuantity = (quantity) => {
  switch (true) {
    case typeof (quantity) !== 'number' && !Number.isInteger(quantity):
      return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
    case quantity <= 0:
      return { err: { code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } };
    default:
      return true;
  }
};

const create = async (name, quantity) => {
  const nameValidations = await isValidName(name);
  const quantityValidations = isValidQuantity(quantity);
  if (!nameValidations.err && !quantityValidations.err) {
    const response = await db.create(name, quantity);
    return response;
  }

  if (nameValidations.err) return nameValidations;

  return quantityValidations;
};

module.exports = {
  create,
};
