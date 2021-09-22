const { findByName } = require('../models/productsModel');

const UNPROCESSABLE_ENTITY_STATUS = 422;

const validName = (name) => {
  const stringLength = 5;

  if (name.length < stringLength) {
    throw { status: UNPROCESSABLE_ENTITY_STATUS, err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    } };
  };
};

const alreadyExists = async (name) => {
  const result = await findByName(name);

  if (result) {
    throw { status: UNPROCESSABLE_ENTITY_STATUS, err: {
      code: 'invalid_data',
      message: 'Product already exists',
    } };
  };
};

const validQuantity = (quantity) => {
  if (quantity < 1) {
    throw { status: UNPROCESSABLE_ENTITY_STATUS, err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    } };
  };
};

const validNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    throw { status: UNPROCESSABLE_ENTITY_STATUS, err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    } };
  };
};

module.exports = {
  alreadyExists,
  validName,
  validNumber,
  validQuantity,
};
