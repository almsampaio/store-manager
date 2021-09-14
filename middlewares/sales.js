const rescue = require('express-rescue');
const { message, status, code } = require('../schema');

const checkSalesQuantity = rescue((req, res, next) => {
  const { quantity } = req.body[0];
  const MIN_QUANTITY = 0;

  if (quantity <= MIN_QUANTITY) {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.invalidQuantity },
    });
  }
  next();
});

const checkTypeSales = rescue((req, res, next) => {
  const { quantity } = req.body[0];
  
  if (typeof quantity === 'string') {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.invalidQuantity },
    });
  }
  next();
});

module.exports = { checkSalesQuantity, checkTypeSales };
