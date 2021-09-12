const { ObjectID } = require('mongodb');
// const salesModel = require('../models/salesModel');

const validateOneId = (id) => {
  try {
    const result = ObjectID(id);
    return result;
  } catch (err) {
    return false;
  }
};

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

const verifyMsg = async (msg) => {
  console.log(msg);
};

module.exports = {
  validateOneId,
  validateAllIds,
  validateAllQtd,
  verifyMsg,
};
