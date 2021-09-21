const { ObjectId } = require('mongodb');
const Validation = require('./constructor');

async function isNameValid(name, verifyExistence) {
  const statusName = 'unprocessableEntity';

  const mustBeString = new Validation(typeof name === 'string');
  const lengthFiveMore = new Validation(name.length >= 5);

  mustBeString.validate('"name" must be a string', statusName);
  lengthFiveMore.validate('"name" length must be at least 5 characters long', statusName);

  if (verifyExistence) {
    const isExistenceFalse = !await verifyExistence(name); // if null(falsy) name is valid because doesn't exist yet
    const nameExist = new Validation(isExistenceFalse);
    nameExist.validate('Product already exists', statusName);
  }
}

function isQuantityValid(quantity, customMsg) {
  const statusName = 'unprocessableEntity';

  const mustBeNumber = new Validation(typeof quantity === 'number');
  const mustBeNumberMessage = customMsg || '"quantity" must be a number';

  const greaterThanZero = new Validation(quantity >= 1);
  const greaterThanZeroMsg = customMsg || '"quantity" must be larger than or equal to 1';

  mustBeNumber.validate(mustBeNumberMessage, statusName);
  greaterThanZero.validate(greaterThanZeroMsg, statusName);
}

const DEFAULT = { message: null, status: null };
async function isIdValid(id, verifyExistence, customInfo = DEFAULT) {
  const { message, status } = customInfo;
  const statusName = status || 'unprocessableEntity';
  const idErrorMsg = message || 'Wrong id format';

  const isObjectIdValid = new Validation(ObjectId.isValid(id));
  isObjectIdValid.validate(idErrorMsg, statusName);

  const isExistenceTrue = !!await verifyExistence(id);
  const idExist = new Validation(isExistenceTrue);
  idExist.validate(idErrorMsg, statusName);
}

module.exports = {
  isNameValid,
  isQuantityValid,
  isIdValid,
};
