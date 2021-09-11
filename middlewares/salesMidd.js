const { ObjectID } = require('mongodb');
// const salesModel = require('../models/salesModel');

const validateAllIds = async (array) => {
  const result = await array.every((e) => {
    try {
      ObjectID(e.productId);
    } catch (err) {
      return false;
    }
    return true;
  });
  return result;
};

const validateAllQtd = async (array) => {
  const result = await array.every(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity < 1) {
      return false;
    }
    return true;
  });
  return result;
};

module.exports = {
  validateAllIds,
  validateAllQtd,
};
