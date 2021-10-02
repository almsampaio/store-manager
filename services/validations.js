const { findByName } = require('../models/modelProducts');
const { HTTP_UNPROCESSABLE_ENTITY } = require('../httpRequests');

const validateName = async (req, res) => {
  const { name } = req.body;
  const nameLength = 5;

  if (name.length < nameLength) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
    } });
  }
};

const alreadyExists = async (req, res) => {
  const { name } = req.body;
  const result = await findByName(name);

  if (result) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const validateQuantity = async (res, req) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
};

const validateNumber = async (res, req) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
};

module.exports = {
  validateName,
  alreadyExists,
  validateQuantity,
  validateNumber,
};