const { ObjectId } = require('mongodb');
const Validation = require('./index');
const productsModel = require('../../models/productsModel');

async function isNameValid(name, verifyExistence) {
  const mustBeString = new Validation(typeof name === 'string');
  const lengthFiveMore = new Validation(name.length >= 5);

  mustBeString.validate('"name" must be a string');
  lengthFiveMore.validate('"name" length must be at least 5 characters long');

  if (verifyExistence) {
    const isNameTrue = !await productsModel.getByName(name); // if null(falsy) name is valid because doesn't exist yet
    const nameExist = new Validation(isNameTrue);
    nameExist.validate('Product already exists');
  }
}

function isQuantityValid(quantity) {
  const mustBeNumber = new Validation(typeof quantity === 'number');
  const greaterThanZero = new Validation(quantity >= 1);

  mustBeNumber.validate('"quantity" must be a number');
  greaterThanZero.validate('"quantity" must be larger than or equal to 1');
}

async function isIdValid(id) {
  const idErrorMsg = 'Wrong id format';

  const isObjectIdValid = new Validation(ObjectId.isValid(id));
  isObjectIdValid.validate(idErrorMsg);

  const isIdTrue = !!await productsModel.getById(id);
  const idExist = new Validation(isIdTrue);
  idExist.validate(idErrorMsg);
}

module.exports = {
  isNameValid,
  isQuantityValid,
  isIdValid,
};
