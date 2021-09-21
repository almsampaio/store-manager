const { ObjectId } = require('mongodb');
const Validation = require('./constructor');

async function isNameValid(name, verifyExistence) {
  const mustBeString = new Validation(typeof name === 'string');
  const lengthFiveMore = new Validation(name.length >= 5);

  mustBeString.validate('"name" must be a string');
  lengthFiveMore.validate('"name" length must be at least 5 characters long');

  if (verifyExistence) {
    const isExistenceFalse = !await verifyExistence(name); // if null(falsy) name is valid because doesn't exist yet
    const nameExist = new Validation(isExistenceFalse);
    nameExist.validate('Product already exists');
  }
}

function isQuantityValid(quantity, genericMessage) {
  const mustBeNumber = new Validation(typeof quantity === 'number');
  const mustBeNumberMessage = '"quantity" must be a number';

  const greaterThanZero = new Validation(quantity >= 1);
  const greaterThanZeroMessage = '"quantity" must be larger than or equal to 1';

  mustBeNumber.validate(genericMessage || mustBeNumberMessage);
  greaterThanZero.validate(genericMessage || greaterThanZeroMessage);
}

async function isIdValid(id, verifyExistence, genericMessage) {
  const idErrorMsg = genericMessage || 'Wrong id format';

  const isObjectIdValid = new Validation(ObjectId.isValid(id));
  isObjectIdValid.validate(idErrorMsg);

  const isExistenceTrue = !!await verifyExistence(id);
  const idExist = new Validation(isExistenceTrue);
  idExist.validate(idErrorMsg);
}

module.exports = {
  isNameValid,
  isQuantityValid,
  isIdValid,
};
