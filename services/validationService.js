const { ObjectID } = require('mongodb');

const isValidId = (id) => {
  if (typeof id !== 'string' || !ObjectID.isValid(id)) {
    return false;
  }

  return true;
};

module.exports = {
  isValidId,
};