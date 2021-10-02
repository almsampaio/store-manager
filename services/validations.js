const { findByName } = require('../models/modelProducts');
const { HTTP_UNPROCESSABLE_ENTITY } = require('../httpRequests');

const validateName = (name) => {
  const nameLength = 5;

  if (name.length < nameLength) {
    try {
      return {
        status: HTTP_UNPROCESSABLE_ENTITY,
      };
    } catch (error) {
      throw new Error({
        err: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      });
    }
  } 
};

const alreadyExists = async (name) => {
  const result = await findByName(name);

  if (result) {
    try {
      return {
        status: HTTP_UNPROCESSABLE_ENTITY,
      };
    } catch (error) {
      throw new Error({
        err: 'invalid_data',
        message: 'Product already exists',
      });
    }
  }
};

const validateQuantity = (quatity) => {
  if (quatity < 1) {
    try {
      return {
        status: HTTP_UNPROCESSABLE_ENTITY,
      };
    } catch (error) {
      throw new Error({
        err: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      });
    }
  }
};

const validateNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    try {
      return {
        status: HTTP_UNPROCESSABLE_ENTITY,
      };
    } catch (error) {
      throw new Error({
        err: 'invalid_data',
        message: '"quantity" must be a number',
      });
    }
  }
};

const validateSearch = (result) => {
  if (!result) {
    try {
      return {
        status: HTTP_UNPROCESSABLE_ENTITY,
      };
    } catch (error) {
      throw new Error({
        err: 'invalid_data',
        message: 'Wrong id format',
      });
    }
  }
};

module.exports = {
  validateName,
  alreadyExists,
  validateQuantity,
  validateNumber,
  validateSearch,
};