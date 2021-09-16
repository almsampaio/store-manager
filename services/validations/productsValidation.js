const Validation = require('./index');
const { findByName } = require('../../models/productsModel');

async function isNameValid(name) {
  const nameNotExist = !await findByName(name); // if null(falsy) name is valid because doesn't exist yet

  const mustBeString = new Validation(typeof name === 'string');
  const lengthFiveMore = new Validation(name.length >= 5);
  const alreadyExists = new Validation(nameNotExist);

  mustBeString.validate('"name" must be a string');
  lengthFiveMore.validate('"name" length must be at least 5 characters long');
  alreadyExists.validate('Product already exists');
}

function isQuantityValid(quantity) {
  const mustBeNumber = new Validation(typeof quantity === 'number');
  const greaterThanZero = new Validation(quantity >= 1);

  mustBeNumber.validate('"quantity" must be a number');
  greaterThanZero.validate('"quantity" must be larger than or equal to 1');
}

module.exports = {
  isNameValid,
  isQuantityValid,
};
