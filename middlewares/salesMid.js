const { ObjectId } = require('mongodb');
const { STATUS_UNPROCESSABLE_ENTITY, STATUS_NOT_FOUND } = require('../utils/status');

const validQuantity = (req, res, next) => {
  const quantity = req.body.map((item) => item.quantity);

  quantity.forEach((quantityItem) => {
    if (typeof quantityItem !== 'number' || quantityItem <= 0) {
      return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });

  next();
};

const validSale = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  next();
};

module.exports = {
  validQuantity,
  validSale,
  validId,
};
