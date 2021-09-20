const { STATUS_UNPROCESSABLE_ENTITY } = require('../utils/status');

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

module.exports = {
  validQuantity,
};
