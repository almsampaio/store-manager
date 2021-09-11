const rescue = require('express-rescue');
const { productsServices } = require('../services');
const { message, status, code } = require('../schema');

const checkProductName = rescue(async (req, res, next) => {
  const { name } = req.body;
  const MIN_LENGTH = 5;
  const findName = await productsServices.findNameService(name);

  if (name.length < MIN_LENGTH) {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.nameShort },
    });
  }

  if (findName) {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.productExist },
    });
  }

  next();
});

const checkProductQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;
  console.log(quantity);
  const MIN_QUANTITY = 0;

  if (quantity <= MIN_QUANTITY) {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.atLeastOneProduct },
    });
  }

  if (typeof quantity === 'string') {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.quantityNotNumber },
    });
  }

  next();
});

module.exports = {
  checkProductName,
  checkProductQuantity,
};
