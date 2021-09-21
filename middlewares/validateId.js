const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY } = require('../utils/HttpStatusCodes');

const validateId = (req, res, next) => {
  const { id } = req.params;

  const isValid = ObjectId.isValid(id);

  if (!isValid) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      }); 
  }
  
  next();  
};

module.exports = validateId;