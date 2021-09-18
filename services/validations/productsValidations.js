const { ObjectId } = require('bson');

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
};

module.exports = validateId;