const {
  STATUS_UNPROCESSABLE,
} = require('../utils/httpStatus');

const validateQuantities = async (req, res, next) => {
  const itensSold = req.body;
  // console.log(`ARR${JSON.stringify(itensSold)}\n`);
  if (!itensSold) return null;
  itensSold.forEach((item) => {
    if (item.quantity <= 0 || typeof (item.quantity) === 'string') {
      return res.status(STATUS_UNPROCESSABLE).json({
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
  validateQuantities,
};