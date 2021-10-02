const { findByName } = require('../models/modelProducts');

const HTTP_UNPROCESSABLE_ENTITY = 422;

const validateName = (name) => {
  const nameLength = 5;

  if (name.length < nameLength) {
    throw {
      status: HTTP_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

const alreadyExists = async (name) => {
  const result = await findByName(name);

  if (result) {
    throw {
      status: HTTP_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};

const validateQuantity = (quatity) => {
  if (quatity < 1) {
    throw {
      status: HTTP_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
};

const validateNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    throw {
      status: HTTP_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
};

module.exports = {
  validateName,
  alreadyExists,
  validateQuantity,
  validateNumber,
};